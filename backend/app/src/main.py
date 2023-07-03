from fastapi import FastAPI
from backend.app.src.utils.cria_database import criar_banco
import backend.app.src.rests.departamento_rest as departamentos
import backend.app.src.rests.estudantes_rest as estudantes
import backend.app.src.rests.turma_rest as turmas
import backend.app.src.rests.avaliacao_turma_rest as avaliacoesTurma
import backend.app.src.rests.avaliacao_professor_rest as avaliacoesProfessor
import backend.app.src.rests.other_rests as other_rests

app = FastAPI()
app.include_router(departamentos.router)
app.include_router(estudantes.router)
app.include_router(turmas.router)
app.include_router(avaliacoesTurma.router)
app.include_router(avaliacoesProfessor.router)
app.include_router(other_rests.router)
