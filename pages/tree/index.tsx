import type { NextPage } from 'next';
import { useCallback } from 'react';
import dagre from 'dagre';
import Head from 'next/head';
import ReactFlow, { Node, addEdge, Background, Edge, Connection, useNodesState, useEdgesState } from 'reactflow';

import 'reactflow/dist/style.css';

import styles from '../../styles/Home.module.css';

function getGraph() {
  const g = new dagre.graphlib.Graph();
  // Set an object for the graph label
  g.setGraph({});

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  g.setNode('kspacey', { label: 'Kevin Spacey', width: 144, height: 100 });
  g.setNode('swilliams', { label: 'Saul Williams', width: 160, height: 100 });
  g.setNode('bpitt', { label: 'Brad Pitt', width: 108, height: 100 });
  g.setNode('hford', { label: 'Harrison Ford', width: 168, height: 100 });
  g.setNode('lwilson', { label: 'Luke Wilson', width: 144, height: 100 });
  g.setNode('kbacon', { label: 'Kevin Bacon', width: 121, height: 100 });

  // Add edges to the graph.
  g.setEdge('kspacey', 'swilliams');
  g.setEdge('swilliams', 'kbacon');
  g.setEdge('bpitt', 'kbacon');
  g.setEdge('hford', 'lwilson');
  g.setEdge('lwilson', 'kbacon');
  console.log(dagre.layout(g));
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

export default function Tree() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((els) => addEdge(params, els)), [setEdges]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="The Jupiter app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background />
        </ReactFlow>
      </main>
    </div>
  );
}
