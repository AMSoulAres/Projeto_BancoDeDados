import React from 'react';

export default function Card(props) {
  return (
    <div class="mt-2 ml-3 max-w-md w-full lg:max-w-full">
      <div class="lg:h-auto lg:w-48 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
      </div>
      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-xl lg:rounded-b-none lg:rounded-r p-4 flex flex-col">
        <div class="mb-8 justify-evenly">
          <div class="text-gray-900 font-bold text-xl mb-2">{props.disciplina}</div>
          <h2 class="text-gray-700 text-base">Professor: {props.professor}</h2>
          <h2 class="text-gray-700 text-base">Turma: {props.turma}</h2>
        </div>
      </div>
    </div>
  );
}