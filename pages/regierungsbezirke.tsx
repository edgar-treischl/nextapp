import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Use the dissolved Regierungsbezirke TopoJSON file (internal boundaries removed, single shape per region)
const REGIERUNGSBEZIRKE_TOPOJSON = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/bavaria-regierungsbezirke-dissolved.topojson`;

const bezirkData = {
  "Oberbayern": 92,
  "Niederbayern": 78,
  "Oberpfalz": 72,
  "Oberfranken": 85,
  "Mittelfranken": 88,
  "Unterfranken": 81,
  "Schwaben": 75,
};

const getColor = (value: number) => {
  if (value >= 85) return "#1e3a8a";
  if (value >= 75) return "#3b82f6";
  if (value >= 65) return "#60a5fa";
  if (value >= 55) return "#93c5fd";
  return "#dbeafe";
};

export default function RegierungsbezirkeMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const codeExample = `import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const bezirkData = {
  "Oberbayern": 92,
  "Mittelfranken": 88,
  "Oberfranken": 85
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
    scale: 9000,
    center: [11.5, 48.8]
  }}
>
  <Geographies 
    geography="/bavaria-regierungsbezirke-dissolved.topojson"
  >
    {({ geographies }) =>
      geographies.map((geo) => {
        const name = geo.properties.name;
        const value = bezirkData[name];
        return (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            fill={value ? getColor(value) : "#e5e7eb"}
            stroke="#fff"
            strokeWidth={1}
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Regierungsbezirke Bayern</h1>
        <p className="text-gray-600 mb-6">
          Interaktive Karte der 7 bayerischen Regierungsbezirke mit react-simple-maps
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Regierungsbezirke Daten</h2>
            <div className="relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 9000,
                  center: [11.5, 48.8],
                }}
                width={1200}
                height={900}
                style={{ maxWidth: "100%", height: "auto" }}
              >
                <Geographies geography={REGIERUNGSBEZIRKE_TOPOJSON}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties?.name;
                      const value = bezirkData[name as keyof typeof bezirkData];
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={value ? getColor(value) : "#e5e7eb"}
                          stroke="#fff"
                          strokeWidth={1}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: "#fbbf24",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(e) => {
                            const { clientX, clientY } = e;
                            setTooltipContent(
                              value
                                ? `${name}: ${value}`
                                : `${name}: Keine Daten`
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

            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-semibold mb-2">Legende</h3>
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

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold mb-3">Regierungsbezirke Übersicht</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(bezirkData).map(([name, value]) => (
                  <div key={name} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                    <span className="font-medium">{name}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Beispiel Code</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Kopieren
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
