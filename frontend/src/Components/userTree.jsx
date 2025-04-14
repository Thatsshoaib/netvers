import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";
import "../Styles/userTree.css";

const UserTree = () => {
  const [treeData, setTreeData] = useState(null);
  const [planId, setPlanId] = useState("");
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const svgRef = useRef();
  const gRef = useRef();

  // 🟦 Fetch all plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/epins/plans");
        setPlans(response.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans.");
      }
    };

    fetchPlans();
  }, []);

  // 🟨 Transform XML into hierarchical tree structure
  const transformXmlToTree = (rootXmlNode) => {
    const attributes = rootXmlNode.attributes;

    const root = {
      id: attributes.getNamedItem("id")?.value || "N/A",
      name: attributes.getNamedItem("name")?.value || "Unnamed",
      sponsor: attributes.getNamedItem("sponsor")?.value || null,
      level: attributes.getNamedItem("level")?.value || null,
      level_sponsor: attributes.getNamedItem("level_sponsor")?.value || null,
      plan: attributes.getNamedItem("plan")?.value || null,
      children: [],
    };

    const queue = [root];
    const childNodes = rootXmlNode.querySelectorAll("node");

    let childIndex = 0;

    // BFS-style assignment to keep max 3 children per node
    while (childIndex < childNodes.length) {
      const parent = queue.shift();
      let addedChildren = 0;

      while (addedChildren < 3 && childIndex < childNodes.length) {
        const xmlNode = childNodes[childIndex];
        const child = {
          id: xmlNode.attributes.getNamedItem("id")?.value || "N/A",
          name: xmlNode.attributes.getNamedItem("name")?.value || "Unnamed",
          sponsor: xmlNode.attributes.getNamedItem("sponsor")?.value || null,
          level: xmlNode.attributes.getNamedItem("level")?.value || null,
          level_sponsor: xmlNode.attributes.getNamedItem("level_sponsor")?.value || null,
          plan: xmlNode.attributes.getNamedItem("plan")?.value || null,
          children: [],
        };

        parent.children.push(child);
        queue.push(child);
        addedChildren++;
        childIndex++;
      }
    }

    return root;
  };

  // 🟥 Handle tree viewing
  const handleViewTree = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.user_id || !planId) {
      setError("Missing user ID or plan ID.");
      return;
    }

    const userId = storedUser.user_id;

    try {
      const response = await axios.get(`http://localhost:5000/api/tree/${userId}/${planId}`, {
        headers: {
          Accept: "application/xml",
        },
      });

      const xmlText = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      const rootNode = xmlDoc.querySelector("tree > node");
      const transformed = transformXmlToTree(rootNode);

      console.log("Parsed Tree Data:", transformed);
      setTreeData(transformed);
      setError(null);
    } catch (err) {
      console.error("Error fetching tree:", err);
      setError(err.response?.data?.error || "Failed to fetch tree.");
    }
  };

  // 🟩 Tree rendering with D3
  useEffect(() => {
    if (!treeData) return;

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.8;
    const rectW = 120,
      rectH = 50;

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [-width / 2, -height / 3, width, height])
      .style("background", "#f8f9fa")
      .call(
        d3.zoom().scaleExtent([0.8, 1.5]).on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
      );

    const g = d3.select(gRef.current).attr("transform", `translate(0,0)`);
    const treeLayout = d3.tree().nodeSize([rectH * 2, rectW * 1.5]);
    const root = d3.hierarchy(treeData);

    root.descendants().forEach((node) => {
      if (node.depth > 0) {
        node._children = node.children;
        node.children = null;
      }
    });

    const updateTree = (source) => {
      treeLayout(root);

      const links = g.selectAll(".link").data(root.links(), (d) => d.target.data.name);

      links
        .enter()
        .append("path")
        .attr("class", "link")
        .merge(links)
        .transition()
        .duration(500)
        .attr(
          "d",
          d3
            .linkVertical()
            .x((d) => d.x)
            .y((d) => d.y)
        );

      links.exit().remove();

      const nodes = g.selectAll(".node").data(root.descendants(), (d) => d.data.name);

      const nodeEnter = nodes
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.x},${source.y})`)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          updateTree(d);
        });

      nodeEnter
        .append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("rx", 8)
        .attr("ry", 8)
        .attr("class", "node-rect");

      nodeEnter
        .append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("class", "node-text")
        .text((d) => d.data.name);

      nodes
        .merge(nodeEnter)
        .transition()
        .duration(500)
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      nodes.exit().remove();
    };

    updateTree(root);
  }, [treeData]);
  

  return (
    <div className="tree-container">
  <div
    style={{
      marginBottom: "30px",
      textAlign: "center",
      padding: "25px",
      background: "linear-gradient(to right, #f7f8fc, #eef1f6)",
      borderRadius: "16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      maxWidth: "650px",
      marginInline: "auto",
      transition: "all 0.3s ease-in-out",
    }}
  >
    <h2
      style={{
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: "600",
        color: "#2c3e50",
        letterSpacing: "0.5px",
      }}
    >
      Explore Your Team Tree
    </h2>

    <div className="flex flex-wrap justify-center gap-3">
      <select
        id="planId"
        value={planId}
        onChange={(e) => setPlanId(e.target.value)}
        style={{
          padding: "12px 18px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "15px",
          outline: "none",
          background: "#fff",
          minWidth: "200px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
          transition: "border 0.3s",
        }}
      >
        <option value="">-- Select Plan --</option>
        {plans.map((plan) => (
          <option key={plan.plan_id} value={plan.plan_id}>
            {plan.plan_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleViewTree}
        className="transition-transform duration-200 font-medium text-white"
        style={{
          padding: "12px 22px",
          background: "linear-gradient(to right, #4e54c8, #8f94fb)",
          border: "none",
          borderRadius: "10px",
          fontSize: "15px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.2)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
        }}
      >
        View Tree
      </button>
    </div>
  </div>

  {error ? (
    <p
      className="text-center font-medium text-red-500 text-[16px] mt-2"
    >
      {error}
    </p>
  ) : (
    <svg ref={svgRef} width="100%" height="auto">
      <g ref={gRef}></g>
    </svg>
  )}
</div>

  
  
  );
};

export default UserTree;
