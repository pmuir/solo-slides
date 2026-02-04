---
theme: ../../theme
title: "State of Product: Agentic @ Solo Connect 2026"
info: |
  ## State of Product: Agentic
  Solo Connect 2026
drawings:
  persist: false
transition: slide-left
mdc: true
routerMode: hash
---

# AI & Agentic Infrastructure

Build, manage, and scale intelligent agents securely and natively in Kubernetes.

<div class="mt-8">
  <span class="px-4 py-2 rounded-full bg-white text-gray-900 font-medium">AI & Agentic</span>
</div>

---
layout: default
---

# Three Products

<div class="flex justify-around items-center h-80">
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">agentgateway</span>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">kagent</span>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">agentregistry</span>
    </div>
  </div>
</div>

---
layout: default
---

# agentregistry demo

<img src="/page-03.png" alt="agentregistry demo" class="w-full rounded-lg shadow-xl" />

---
layout: default
---

<img src="/slide-2-bg-fragmented-shield.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.42; z-index: 0; pointer-events: none;" />

<img src="/corner-glow-accent.png" alt="" style="position: fixed; right: -50px; bottom: -50px; height: 400px; opacity: 0.65; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">

<h1 style="margin-bottom: 0.25rem; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">Two Problems, Every Single Time</h1>

<p class="subtitle" style="margin-bottom: 0.5rem;">IDENTITY IN AGENTIC SYSTEMS</p>

<div style="background: rgba(30, 30, 40, 0.95); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.85rem; box-shadow: 0 0 12px rgba(168, 85, 247, 0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
    <strong style="font-size: 0.9rem;">Old Perimeter Model Breaks Down</strong>
    <span style="color: var(--solo-purple); font-size: 0.65rem; font-weight: 600;">PROBLEM</span>
  </div>
  <ul style="margin: 0; padding-left: 1.25rem; color: var(--solo-text-muted); font-size: 0.75rem; line-height: 1.4;">
    <li>Old perimeter model: authenticate at the gate, trust everything inside</li>
    <li>Agents are probabilistic → can't predict MCP server calls</li>
    <li>Need least privilege: user → agent → MCP server</li>
  </ul>
</div>

<div style="display: flex; justify-content: space-around; padding: 0.5rem 0;">
  <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.8));">
    <defs>
      <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
      </linearGradient>
    </defs>
    <line x1="20" y1="5" x2="20" y2="30" stroke="url(#arrowGrad1)" stroke-width="3" stroke-linecap="round"/>
    <polyline points="10,22 20,35 30,22" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.8));">
    <defs>
      <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
      </linearGradient>
    </defs>
    <line x1="20" y1="5" x2="20" y2="30" stroke="url(#arrowGrad2)" stroke-width="3" stroke-linecap="round"/>
    <polyline points="10,22 20,35 30,22" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>

<div style="display: flex; gap: 0.5rem; font-size: 0.85rem;">
  <div style="flex: 1; background: rgba(30, 30, 40, 0.95); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 0.5rem; padding: 0.5rem 0.75rem; box-shadow: 0 0 12px rgba(168, 85, 247, 0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
      <strong style="font-size: 0.9rem;">On-Behalf-Of</strong>
      <span style="color: var(--solo-purple); font-size: 0.65rem; font-weight: 600;">SOLUTION</span>
    </div>
    <ul style="margin: 0; padding-left: 1.25rem; color: var(--solo-text-muted); font-size: 0.75rem; line-height: 1.4;">
      <li>Control both user & agent on-behalf-of user access</li>
      <li>Follow best security practices with token delegation</li>
      <li>Audit trail covers users & agents acting on-behalf-of users</li>
    </ul>
  </div>
  <div style="flex: 1; background: rgba(30, 30, 40, 0.95); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 0.5rem; padding: 0.5rem 0.75rem; box-shadow: 0 0 12px rgba(168, 85, 247, 0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
      <strong style="font-size: 0.9rem;">Elicitation</strong>
      <span style="color: var(--solo-purple); font-size: 0.65rem; font-weight: 600;">SOLUTION</span>
    </div>
    <ul style="margin: 0; padding-left: 1.25rem; color: var(--solo-text-muted); font-size: 0.75rem; line-height: 1.4;">
      <li>Drop in support for existing MCP server</li>
      <li>Isolation guaranteed</li>
      <li>Single pane of glass for management</li>
    </ul>
  </div>
</div>

</div>

---
layout: default
---

# Two Problems, Every Single Time

<p class="subtitle">DISCOVERY & REGISTRY</p>

<div class="mt-4 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
  <div class="flex justify-between items-center mb-2">
    <strong>Agent Sprawl Across Clouds</strong>
    <span class="text-purple-400 text-sm font-semibold">PROBLEM</span>
  </div>
  <ul class="text-gray-400 text-sm">
    <li>Agents everywhere: K8s, Vertex, AgentCore</li>
    <li>No visibility into what's running</li>
    <li>Teams rebuild the same thing</li>
  </ul>
</div>

<div class="flex gap-4 mt-6">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <div class="flex justify-between items-center mb-2">
      <strong>Single Control Plane</strong>
      <span class="text-purple-400 text-sm font-semibold">SOLUTION</span>
    </div>
    <ul class="text-gray-400 text-sm">
      <li>See everything (even old stuff)</li>
      <li>Unified catalog across clouds</li>
      <li>Semantic search for reuse</li>
    </ul>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <div class="flex justify-between items-center mb-2">
      <strong>Deploy Anywhere</strong>
      <span class="text-purple-400 text-sm font-semibold">SOLUTION</span>
    </div>
    <ul class="text-gray-400 text-sm">
      <li>Build once, deploy to any cloud</li>
      <li>K8s, Vertex, AgentCore from single UI</li>
      <li>Unified governance & observability</li>
    </ul>
  </div>
</div>

---
layout: default
---

# Who We're Building For

<p class="subtitle">THREE PRODUCTS, THREE TARGET AUDIENCES WITH OVERLAPPING INTERESTS</p>

<div class="space-y-4 mt-6">
  <div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong class="text-purple-300">agentregistry → Teams with Multi-Cloud Agents</strong>
    <p class="text-sm text-gray-400 mt-1"><strong>Who:</strong> Organizations with agents spread across clouds (K8s, Vertex, AgentCore)</p>
    <p class="text-sm text-gray-400"><strong>Focus:</strong> Discovery, governance, and unified control across platforms</p>
  </div>

  <div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong class="text-purple-300">agentgateway → Any Team with AI Agents or Consuming LLMs</strong>
    <p class="text-sm text-gray-400 mt-1"><strong>Who:</strong> Developer teams, AI teams, platform teams with agentic workloads or consuming LLMs</p>
    <p class="text-sm text-gray-400"><strong>Focus:</strong> MCP connectivity, LLM access control, authorization, observability</p>
  </div>

  <div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong class="text-purple-300">kagent → Platform Engineering Teams</strong>
    <p class="text-sm text-gray-400 mt-1"><strong>Who:</strong> Platform teams building AI agents to automate their own workflows</p>
    <p class="text-sm text-gray-400"><strong>Focus:</strong> Secure, observable agent infrastructure on Kubernetes</p>
  </div>
</div>

---
layout: section
---

# agentregistry

<div class="text-gray-400 mt-4">Multi-cloud agent registry and control plane</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>What?</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentregistry</span>
  </div>
</div>

<p class="subtitle">OPEN SOURCE PROJECT + ENTERPRISE PRODUCT</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>Overview</strong>
  <p class="text-gray-400 text-sm mt-2">Unified registry and control plane for AI agents, MCP servers, and skills. Build once, deploy to Kubernetes, GCP Vertex, and AWS AgentCore from a single interface.</p>
</div>

<div class="flex gap-4 mt-4">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Open Source</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Agent registry for Kubernetes</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> CLI for build, push, deploy workflow</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> K8s deployment & discovery, semantic search, agent scaffolding</p>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Solo Enterprise</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Multi-cloud control plane for agentic governance</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> Cloud account integration + unified dashboard</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> Vertex/AgentCore deployment & discovery, observability, authorization</p>
  </div>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Problems Solved</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentregistry</span>
  </div>
</div>

<p class="subtitle">PLATFORM ENGINEERING TEAMS</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>Problems They Face</strong>
  <ul class="text-gray-400 text-sm mt-2">
    <li>Agents deployed everywhere: K8s, Vertex AI, AgentCore, local dev environments</li>
    <li>No visibility into what agents exist, what they do, or where they run</li>
    <li>Teams rebuild the same agents because discovery is impossible</li>
    <li>Can't enforce governance policies across different platforms</li>
  </ul>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>What agentregistry Delivers</strong>
  <p class="text-gray-400 text-sm mt-2"><strong>Universal catalog:</strong> Single pane of glass across all clouds and platforms</p>
  <p class="text-gray-400 text-sm"><strong>Semantic search:</strong> Find agents by capability, not just name</p>
  <p class="text-gray-400 text-sm"><strong>Build once, deploy anywhere:</strong> K8s, Vertex, AgentCore from one definition</p>
  <p class="text-gray-400 text-sm"><strong>Unified access control:</strong> Consistent authorization policies across all platforms</p>
  <p class="text-gray-400 text-sm"><strong>Unified governance:</strong> Observability and compliance across all deployments</p>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Progress & Roadmap</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentregistry</span>
  </div>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-6">
  <strong>Progress to date</strong>
  <ul class="text-gray-400 text-sm mt-2">
    <li>Build once, deploy to K8s, Vertex, AgentCore</li>
    <li>Discover agents across connected clouds</li>
    <li>Semantic search & unified catalog</li>
    <li>Multi-cloud dashboard</li>
    <li>Unified observability (tracing)</li>
    <li>Registry as MCP server</li>
  </ul>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>What's Next</strong>
  <ul class="text-gray-400 text-sm mt-2">
    <li>Agent blueprints for dependencies</li>
    <li>Authorization & governance</li>
    <li>Prompt management & templates</li>
  </ul>
</div>

---
layout: section
---

# agentgateway

<div class="text-gray-400 mt-4">AI-native gateway for secure agent connectivity</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>What?</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentgateway</span>
  </div>
</div>

<p class="subtitle">OPEN SOURCE PROJECT + ENTERPRISE PRODUCT</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>Overview</strong>
  <p class="text-gray-400 text-sm mt-2">AI-native gateway for secure connectivity between agents, LLMs, and MCP tools. Linux Foundation project focused on AI protocol support that traditional API gateways lack.</p>
</div>

<div class="flex gap-4 mt-4">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Open Source</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Gateway for MCP, LLM, and A2A protocols</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> TODO</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> MCP federation, LLM provider support, basic auth</p>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Solo Enterprise</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Highly available data plane</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> HA control plane + on-behalf-of identity + global rate limiting</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> Enterprise UI, 24x7 support, observability</p>
  </div>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Problems Solved</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentgateway</span>
  </div>
</div>

<p class="subtitle">ANY TEAM WITH AI AGENTS OR CONSUMING LLMs</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>Problems They Face</strong>
  <p class="text-gray-400 text-sm mt-2"><strong>Agents using MCP:</strong> Call servers directly → no visibility or control</p>
  <p class="text-gray-400 text-sm"><strong>LLM connections:</strong> Direct API calls → no cost control or governance</p>
  <p class="text-gray-400 text-sm"><strong>Identity:</strong> perimeter model fails with probabilistic behavior</p>
  <p class="text-gray-400 text-sm"><strong>Audit:</strong> Can't audit what's happening or who's acting on behalf of whom</p>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>What agentgateway Delivers</strong>
  <p class="text-gray-400 text-sm mt-2"><strong>On-behalf-of security:</strong> Proper token delegation with audit trails</p>
  <p class="text-gray-400 text-sm"><strong>Drop-in solution:</strong> Works with existing MCP servers & LLM APIs</p>
  <p class="text-gray-400 text-sm"><strong>Cost & usage control:</strong> Rate limiting, quotas, and spend monitoring</p>
  <p class="text-gray-400 text-sm"><strong>Fine-grained authorization:</strong> Policies at agent, tool, and model level</p>
  <p class="text-gray-400 text-sm"><strong>Full observability:</strong> Tracing, metrics for all AI interactions</p>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Progress & Roadmap</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">agentgateway</span>
  </div>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-6">
  <strong>Increased release frequency</strong>
  <p class="text-gray-400 text-sm mt-2">Release every 4-6 weeks with themes (lean style)</p>
</div>

<div class="flex gap-4 mt-4">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Themes: 2.2</strong>
    <ul class="text-gray-400 text-sm mt-2">
      <li>Improving on-behalf-of (OBO)</li>
      <li>Elicitation improvements</li>
      <li>Addressing prospect & customer issues</li>
    </ul>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Themes: 2.3 and beyond</strong>
    <ul class="text-gray-400 text-sm mt-2">
      <li>Cost control & monitoring</li>
      <li>MCP guardrails</li>
      <li>Real-time APIs & performance</li>
    </ul>
  </div>
</div>

---
layout: section
---

# kagent

<div class="text-gray-400 mt-4">Kubernetes-native AI agent platform</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>What?</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">kagent</span>
  </div>
</div>

<p class="subtitle">OPEN SOURCE PROJECT + ENTERPRISE PRODUCT</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>Overview</strong>
  <p class="text-gray-400 text-sm mt-2">Kubernetes-native framework for deploying and managing AI agents. CNCF sandbox project that integrates with popular agent frameworks like Langgraph, CrewAI, and Google ADK.</p>
</div>

<div class="flex gap-4 mt-4">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Open Source</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Agent hosting platform for Kubernetes</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> Kubernetes operators + CRDs for agent lifecycle</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> Built-in agents, BYO agent support, basic observability</p>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Solo Enterprise</strong>
    <p class="text-sm text-gray-400 mt-2"><strong>What:</strong> Production-ready with multi-cluster mgmt</p>
    <p class="text-sm text-gray-400"><strong>How:</strong> Hardened control plane + advanced RBAC + multi-cluster</p>
    <p class="text-sm text-gray-400"><strong>Includes:</strong> Enterprise UI, 24x7 support, compliance features</p>
  </div>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Problems Solved</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">kagent</span>
  </div>
</div>

<div class="flex gap-6 mt-6">
  <div class="flex-1 p-6 bg-white text-gray-900 rounded-lg">
    <div class="text-purple-600 text-sm font-semibold mb-2">01</div>
    <strong class="text-lg">Platform Engineering Copilot</strong>
    <p class="text-sm text-gray-600 mt-2">Supercharge your platform team with AI-powered assistants for day-to-day operations.</p>
    <ul class="text-sm text-gray-600 mt-3 space-y-1">
      <li>✓ Debug & troubleshoot clusters in real-time</li>
      <li>✓ Automate release & deployment workflows</li>
      <li>✓ Generate runbooks & documentation</li>
      <li>✓ Incident response & root cause analysis</li>
    </ul>
    <div class="flex items-center gap-2 mt-4 text-sm">
      <span class="px-2 py-1 bg-gray-100 rounded">Engineer</span>
      <span>→</span>
      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded">Kagent</span>
      <span>→</span>
      <span class="px-2 py-1 bg-gray-100 rounded">K8s</span>
    </div>
  </div>

  <div class="flex-1 p-6 bg-white text-gray-900 rounded-lg">
    <div class="text-purple-600 text-sm font-semibold mb-2">02</div>
    <strong class="text-lg">Agentic Platform</strong>
    <p class="text-sm text-gray-600 mt-2">Run any agent framework in production with enterprise-grade infrastructure.</p>
    <ul class="text-sm text-gray-600 mt-3 space-y-1">
      <li>✓ Bring LangChain, CrewAI, or custom agents</li>
      <li>✓ Identity, auth & policy out of the box</li>
      <li>✓ Full observability & tracing</li>
      <li>✓ Human-in-the-loop controls</li>
    </ul>
    <div class="flex items-center gap-2 mt-4 text-sm">
      <span class="px-2 py-1 bg-gray-100 rounded">Any Agent</span>
      <span>→</span>
      <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded">Kagent Platform</span>
      <span>→</span>
      <span class="px-2 py-1 bg-gray-100 rounded">Production</span>
    </div>
  </div>
</div>

---
layout: default
---

<div class="flex justify-between items-start">
  <h1>Progress & Roadmap</h1>
  <div class="text-right">
    <span class="text-gray-400 text-sm">SOLO ENTERPRISE FOR</span>
    <span class="text-purple-400 text-2xl font-bold ml-2">kagent</span>
  </div>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-6">
  <strong>Progress to date</strong>
  <div class="flex items-center gap-4 mt-3">
    <span class="text-gray-400">POCs with:</span>
    <div class="flex gap-4">
      <span class="px-3 py-1 bg-blue-900 rounded font-semibold">PEPSI</span>
      <span class="px-3 py-1 bg-blue-900 rounded font-semibold">VISA</span>
      <span class="px-3 py-1 bg-blue-900 rounded font-semibold">Nomi Health</span>
    </div>
  </div>
</div>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-4">
  <strong>What's Next - Continue Innovating</strong>
  <p class="text-gray-400 text-sm mt-2"><strong>Scale to zero:</strong> Cost optimization & efficient resource management</p>
  <p class="text-gray-400 text-sm"><strong>Long-term memory:</strong> Persistent context across sessions</p>
  <p class="text-gray-400 text-sm"><strong>Sandbox security:</strong> Hide secrets from agents, secure execution</p>
</div>

---
layout: default
---

# agenttoolbox

<p class="subtitle">CROSS PRODUCT LIBRARY/TOOL (PLANNED)</p>

<div class="p-4 border-l-4 border-purple-500 bg-gray-900 rounded mt-6">
  <strong>The Problem We'll Address</strong>
  <ul class="text-gray-400 text-sm mt-2">
    <li>How do you know your agent works?</li>
    <li>Probabilistic → hard to test</li>
    <li>Need validation in production</li>
  </ul>
</div>

<div class="flex gap-4 mt-4">
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>What Teams Will Need</strong>
    <ul class="text-gray-400 text-sm mt-2">
      <li>Pre-deployment testing</li>
      <li>Quality metrics</li>
      <li>Runtime monitoring</li>
    </ul>
  </div>
  <div class="flex-1 p-4 border-l-4 border-purple-500 bg-gray-900 rounded">
    <strong>Future Vision</strong>
    <ul class="text-gray-400 text-sm mt-2">
      <li>Cross-product library</li>
      <li>Integrate anywhere</li>
      <li>Flexible tooling</li>
    </ul>
  </div>
</div>

<div class="mt-6 text-center text-yellow-400 text-sm">
  ⚠️ This is future direction - not currently available
</div>

---
layout: default
---

# Three Products

<div class="flex justify-around items-center h-80">
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">agentgateway</span>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">kagent</span>
    </div>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center">
      <span class="text-purple-400 font-semibold">agentregistry</span>
    </div>
  </div>
</div>

---
src: ../../shared/slides/thank-you.md
---
