from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import src.rests.estudantes_rest as estudantes
import src.rests.turma_rest as turmas
import src.rests.avaliacao_turma_rest as avaliacoesTurma
import src.rests.avaliacao_professor_rest as avaliacoesProfessor
import src.rests.other_rests as other_rests
import src.rests.read_only_rests as read_only
import src.rests.denuncia_rest as denuncia

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
app.include_router(denuncia.router)
