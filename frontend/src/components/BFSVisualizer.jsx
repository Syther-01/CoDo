import { useState } from "react"

const graph = {

  1: [2, 4],

  2: [1, 3],

  3: [2, 6],

  4: [1, 5],

  5: [4, 6],

  6: [3, 5]

}

const positions = {

  1: { x: 100, y: 100 },

  2: { x: 250, y: 100 },

  3: { x: 400, y: 100 },

  4: { x: 100, y: 250 },

  5: { x: 250, y: 250 },

  6: { x: 400, y: 250 }

}

function BFSVisualizer() {

  const [visited, setVisited] = useState([])

  const [queue, setQueue] = useState([])

  const [running, setRunning] = useState(false)

  async function startBFS() {

    if (running) return

    setVisited([])

    setQueue([])

    setRunning(true)

    const vis = new Set()

    const q = [1]

    vis.add(1)

    setQueue([...q])

    while (q.length > 0) {

      const node = q.shift()

      setQueue([...q])

      setVisited((prev) => [...prev, node])

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      )

      for (const neighbor of graph[node]) {

        if (!vis.has(neighbor)) {

          vis.add(neighbor)

          q.push(neighbor)

          setQueue([...q])

        }

      }

    }

    setRunning(false)
  }

  return (

    <div className="max-w-7xl mx-auto mt-24 px-6">

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>

            <h2 className="text-4xl font-bold">
              BFS Visualizer
            </h2>

            <p className="text-gray-500 mt-2">
              Visualize Breadth First Search traversal
            </p>

          </div>

          <button
            onClick={startBFS}

            className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl font-bold"
          >
            Start BFS
          </button>

        </div>

        {/* Queue */}
        <div className="mb-10">

          <h3 className="text-2xl font-bold mb-4">
            Queue
          </h3>

          <div className="flex gap-4 flex-wrap">

            {queue.map((node, index) => (

              <div
                key={index}
                className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center font-bold text-xl"
              >
                {node}
              </div>

            ))}

          </div>

        </div>

        {/* Traversal */}
        <div className="mb-10">

          <h3 className="text-2xl font-bold mb-4">
            Traversal Order
          </h3>

          <div className="flex gap-4 flex-wrap">

            {visited.map((node, index) => (

              <div
                key={index}
                className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center font-bold text-xl"
              >
                {node}
              </div>

            ))}

          </div>

        </div>

        {/* Graph */}
        <div className="relative h-[400px] bg-black/20 rounded-3xl overflow-hidden">

          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full">

            {/* 1-2 */}
            <line
              x1="100"
              y1="100"
              x2="250"
              y2="100"
              stroke="#444"
              strokeWidth="4"
            />

            {/* 2-3 */}
            <line
              x1="250"
              y1="100"
              x2="400"
              y2="100"
              stroke="#444"
              strokeWidth="4"
            />

            {/* 1-4 */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="250"
              stroke="#444"
              strokeWidth="4"
            />

            {/* 4-5 */}
            <line
              x1="100"
              y1="250"
              x2="250"
              y2="250"
              stroke="#444"
              strokeWidth="4"
            />

            {/* 5-6 */}
            <line
              x1="250"
              y1="250"
              x2="400"
              y2="250"
              stroke="#444"
              strokeWidth="4"
            />

            {/* 3-6 */}
            <line
              x1="400"
              y1="100"
              x2="400"
              y2="250"
              stroke="#444"
              strokeWidth="4"
            />

          </svg>

          {/* Nodes */}
          {Object.keys(positions).map((node) => {

            const pos = positions[node]

            const isVisited =
              visited.includes(Number(node))

            return (

              <div
                key={node}

                className={`absolute w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl transition-all duration-500
                  
                  ${isVisited
                    ? "bg-green-500 scale-110 shadow-[0_0_30px_#22c55e]"
                    : "bg-gray-700"
                  }
                `}

                style={{
                  left: pos.x,
                  top: pos.y
                }}
              >
                {node}
              </div>

            )
          })}

        </div>

      </div>

    </div>
  )
}

export default BFSVisualizer