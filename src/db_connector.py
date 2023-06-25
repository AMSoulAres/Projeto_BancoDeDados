import mysql.connector
import _mysql_connector
from src.utils.cria_database import criar_banco

try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="avaliacaounb"
    )
    
except Exception:
    criar_banco()

db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="avaliacaounb"
    )

mycursor = db.cursor()
