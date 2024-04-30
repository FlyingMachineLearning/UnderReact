import React, { useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

const GraphComponent = () => {
    const [hoverNode, setHoverNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    const data = {
        nodes: [
            { id: 'Alice', name: 'Alice', color: '#f00' },
            { id: 'Bob', name: 'Bob' },
            { id: 'Carol', name: 'Carol' },
            { id: 'Dave', name: 'Dave' },
            { id: 'Eve', name: 'Eve' },
            { id: 'Frank', name: 'Frank' },
            { id: 'Gina', name: 'Gina' },
            { id: 'Hank', name: 'Hank' },
            { id: 'Ivy', name: 'Ivy' },
            { id: 'Jack', name: 'Jack' },
            { id: 'Karen', name: 'Karen' },
            { id: 'Lewis', name: 'Lewis' },
            { id: 'Mona', name: 'Mona' },
            { id: 'Nick', name: 'Nick' },
            { id: 'Olive', name: 'Olive' },
            { id: 'Peter', name: 'Peter' },
            { id: 'Quincy', name: 'Quincy' },
            { id: 'Rachel', name: 'Rachel' },
            { id: 'Steve', name: 'Steve' },
            { id: 'Tina', name: 'Tina' },
            { id: 'Uma', name: 'Uma' },
{ id: 'Vince', name: 'Vince' },
{ id: 'Wanda', name: 'Wanda' },
{ id: 'Xander', name: 'Xander' },
{ id: 'Yara', name: 'Yara' },
{ id: 'Zach', name: 'Zach' },
        ],
        links: [
            { source: 'Alice', target: 'Bob' },
{ source: 'Bob', target: 'Carol' },
{ source: 'Carol', target: 'Dave' },
{ source: 'Dave', target: 'Eve' },
{ source: 'Eve', target: 'Frank' },
{ source: 'Frank', target: 'Gina' },
{ source: 'Gina', target: 'Hank' },
{ source: 'Hank', target: 'Ivy' },
{ source: 'Ivy', target: 'Jack' },
{ source: 'Jack', target: 'Karen' },
{ source: 'Karen', target: 'Lewis' },
{ source: 'Lewis', target: 'Mona' },
{ source: 'Mona', target: 'Nick' },
{ source: 'Nick', target: 'Olive' },
{ source: 'Olive', target: 'Peter' },
{ source: 'Peter', target: 'Quincy' },
{ source: 'Quincy', target: 'Rachel' },
{ source: 'Rachel', target: 'Steve' },
{ source: 'Steve', target: 'Tina' },
{ source: 'Tina', target: 'Uma' },
{ source: 'Uma', target: 'Vince' },
{ source: 'Vince', target: 'Wanda' },
{ source: 'Wanda', target: 'Xander' },
{ source: 'Xander', target: 'Yara' },
{ source: 'Yara', target: 'Zach' },
{ source: 'Zach', target: 'Alice' },
        ]
    };

    return (
        <div>
            <ForceGraph2D
                graphData={data}
                onNodeHover={node => setHoverNode(node)}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const size = node === hoverNode ? 12 : 8;
                    const color = node === hoverNode ? 'red' : node.color;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }}
                nodeCanvasObjectMode={() => 'before'}
                nodePointerAreaPaint={(node, color, ctx) => {
                    const size = node === hoverNode ? 12 : 8;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                }}
            />
        </div>
    );
};

export default GraphComponent;
