from db_connector import mycursor
import mysql.connector.errors as exceptionMySQL

"""
Comando para criar banco de dados
mycursor.execute("CREATE DATABASE AvaliacaoUNB")
"""

openFile = open("BDSQL.sql", "r")
sqlFile = openFile.read()
openFile.close()

sqlCommands = sqlFile.split(";")

for command in sqlCommands:
    try:
        if not command.strip().startswith("--"):
            print(command)
            mycursor.execute(command)
    except exceptionMySQL.OperationalError as err:
        print(err)