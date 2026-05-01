import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Use relative path for TopoJSON - Next.js will resolve it from public folder
const GERMANY_TOPO_JSON = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/germany-states.json`;

// Example data for German federal states (Bundesländer)
const stateData: Record<string, { name: string; value: number }> = {
  "Niedersachsen": { name: "Lower Saxony", value: 74 },
  "Bayern": { name: "Bavaria", value: 92 },
  "Baden-Württemberg": { name: "Baden-Württemberg", value: 85 },
  "Nordrhein-Westfalen": { name: "North Rhine-Westphalia", value: 79 },
  "Brandenburg": { name: "Brandenburg", value: 65 },
  "Mecklenburg-Vorpommern": { name: "Mecklenburg-Vorpommern", value: 58 },
  "Hessen": { name: "Hesse", value: 81 },
  "Sachsen-Anhalt": { name: "Saxony-Anhalt", value: 62 },
  "Thüringen": { name: "Thuringia", value: 64 },
  "Schleswig-Holstein": { name: "Schleswig-Holstein", value: 76 },
  "Rheinland-Pfalz": { name: "Rhineland-Palatinate", value: 71 },
  "Sachsen": { name: "Saxony", value: 69 },
  "Berlin": { name: "Berlin", value: 78 },
  "Hamburg": { name: "Hamburg", value: 88 },
  "Saarland": { name: "Saarland", value: 68 },
  "Bremen": { name: "Bremen", value: 72 },
};

// Color scale function
const getColor = (value: number) => {
  if (value >= 85) return "#1e3a8a"; // Dark blue
  if (value >= 75) return "#3b82f6"; // Blue
  if (value >= 65) return "#60a5fa"; // Light blue
  if (value >= 55) return "#93c5fd"; // Lighter blue
  return "#dbeafe"; // Very light blue
};

export default function GermanyMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const codeExample = `import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const stateData = {
  "Bayern": { name: "Bavaria", value: 92 },
  "Baden-Württemberg": { name: "Baden-Württemberg", value: 85 },
  // ... more states
};

const getColor = (value: number) => {
  if (value >= 85) return "#1e3a8a";
  if (value >= 75) return "#3b82f6";
  if (value >= 65) return "#60a5fa";
  return "#dbeafe";
};

<ComposableMap
  projection="geoMercator"
  projectionConfig={{ 
    scale: 3800,        // Higher scale = more zoom
    center: [10.5, 51.3] // Longitude, Latitude for Germany center
  }}
>
  <Geographies geography="/germany-states.json">
    {({ geographies }) =>
      geographies.map((geo) => {
        const stateName = geo.properties.name;
        const data = stateData[stateName];
        return (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill={data ? getColor(data.value) : "#f3f4f6"}
          />
        );
      })
    }
  </Geographies>
</ComposableMap>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Germany Map</h1>
        <p className="text-gray-600 mb-6">
          Interactive map of German federal states using react-simple-maps
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Federal States Data</h2>
            <div className="relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 3800,
                  center: [10.5, 51.3],
                }}
                width={1200}
                height={900}
                style={{ maxWidth: "100%", height: "auto" }}
              >
                <Geographies geography={GERMANY_TOPO_JSON}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const data = stateData[stateName];
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={data ? getColor(data.value) : "#f3f4f6"}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: data ? "#fbbf24" : "#f3f4f6",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(e) => {
                            const { clientX, clientY } = e;
                            setTooltipContent(
                              data
                                ? `${data.name}: ${data.value}`
                                : `${stateName}: No data`
                            );
                            setTooltipPosition({ x: clientX, y: clientY });
                            setShowTooltip(true);
                          }}
                          onMouseMove={(e) => {
                            const { clientX, clientY } = e;
                            setTooltipPosition({ x: clientX, y: clientY });
                          }}
                          onMouseLeave={() => {
                            setShowTooltip(false);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
              {showTooltip && (
                <div
                  className="fixed bg-gray-900 text-white px-3 py-2 rounded text-sm pointer-events-none z-50"
                  style={{
                    left: tooltipPosition.x + 10,
                    top: tooltipPosition.y + 10,
                  }}
                >
                  {tooltipContent}
                </div>
              )}
            </div>

            {/* Legend - Smaller and more compact */}
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-semibold mb-2">Legend</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1e3a8a" }}></div>
                  <span className="text-xs">85-100</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3b82f6" }}></div>
                  <span className="text-xs">75-84</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#60a5fa" }}></div>
                  <span className="text-xs">65-74</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#93c5fd" }}></div>
                  <span className="text-xs">55-64</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "#dbeafe" }}></div>
                  <span className="text-xs">&lt;55</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Section - Takes up 1/3 of the space */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Example Code</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-white {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
