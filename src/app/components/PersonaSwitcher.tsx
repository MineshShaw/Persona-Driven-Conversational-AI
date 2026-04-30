"use client";

import { PersonaId, personaLabels } from "../lib/personas";

type PersonaSwitcherProps = {
  selectedPersona: PersonaId;
  onChangePersona: (persona: PersonaId) => void;
};

export default function PersonaSwitcher({
  selectedPersona,
  onChangePersona,
}: PersonaSwitcherProps) {
  const personaIds = Object.keys(personaLabels) as PersonaId[];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {personaIds.map((personaId) => {
        const isActive = selectedPersona === personaId;

        return (
          <button
            key={personaId}
            type="button"
            onClick={() => onChangePersona(personaId)}
            className={[
              "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100",
            ].join(" ")}
          >
            {personaLabels[personaId]}
          </button>
        );
      })}
    </div>
  );
}
