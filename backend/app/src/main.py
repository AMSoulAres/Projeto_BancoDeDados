from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.src.utils.cria_database import criar_banco
import backend.app.src.rests.estudantes_rest as estudantes
import backend.app.src.rests.turma_rest as turmas
import backend.app.src.rests.avaliacao_turma_rest as avaliacoesTurma
import backend.app.src.rests.avaliacao_professor_rest as avaliacoesProfessor
import backend.app.src.rests.other_rests as other_rests
import backend.app.src.rests.read_only_rests as read_only

app = FastAPI()

# Configurar as origens permitidas
origins = [
    "http://localhost:3000",  # URL do frontend
    # Adicione outras origens permitidas
]

# Adicionar o middleware CORS ao aplicativo
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(estudantes.router)
app.include_router(turmas.router)
app.include_router(avaliacoesTurma.router)
app.include_router(avaliacoesProfessor.router)
app.include_router(other_rests.router)
app.include_router(read_only.router)
