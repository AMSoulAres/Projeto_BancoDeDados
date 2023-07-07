import React, { useState, useEffect } from 'react';
import PrefCheckBox from './prefcheckbox';

export default function PreferenciasForm() {
  const [preferences, setPreferences] = useState([]);

  const fetchPreferences = async () => {
    await fetch('http://localhost:8000/Preferencias/lista-preferencias')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter as preferências');
        }
        return response.json();
      })
      .then((data) => setPreferences(data))
      .catch((error) => console.error('Erro ao obter as preferências:', error));
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"
          style={{ top: '-100px' }}
        >
          <div className="container py-4 content">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'Verdana, sans-serif',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Selecione Preferências:
            </h2>
            {preferences.map((preference) => (
              <PrefCheckBox name={preference} />
            ))}
            <div className="mt-3 flex gap-x-2">
              <button
                type="button"
                className="px-3 py-1.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
