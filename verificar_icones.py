import os
import sqlite3
import requests

# Caminhos configurados
DB_PATH = 'wow_macros.db'
ICONS_FOLDER = 'public/icons'

# Garante que a pasta de ícones existe
os.makedirs(ICONS_FOLDER, exist_ok=True)

# Conecta ao banco de dados
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Busca todos os nomes de ícones distintos cadastrados no banco
cursor.execute('SELECT DISTINCT icon_name FROM skills WHERE icon_name IS NOT NULL AND icon_name != ""')
icones_db = cursor.fetchall()
conn.close()

total_verificados = len(icones_db)
baixados_agora = 0
ja_existentes = 0
erros = 0

print(f"Iniciando verificação de {total_verificados} ícones no banco de dados...\n")

for (icon_name,) in icones_db:
    nome_arquivo = f"{icon_name}.jpg"
    caminho_completo = os.path.join(ICONS_FOLDER, nome_arquivo)
    
    # Verifica se o arquivo já existe na pasta
    if os.path.exists(caminho_completo):
        ja_existentes += 1
    else:
        # Se não existe, tenta baixar da CDN oficial do WoW
        url = f"https://wow.zamimg.com/images/wow/icons/large/{icon_name.lower()}.jpg"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                with open(caminho_completo, 'wb') as f:
                    f.write(response.content)
                print(f"[BAIXADO] {nome_arquivo}")
                baixados_agora += 1
            else:
                print(f"[ERRO 404] Ícone não encontrado na CDN: {icon_name}")
                erros += 1
        except Exception as e:
            print(f"[FALHA DE REDE] Não foi possível baixar {icon_name}: {e}")
            erros += 1

print("\n--- Relatório Final ---")
print(f"Total de ícones no banco: {total_verificados}")
print(f"Já estavam na pasta: {ja_existentes}")
print(f"Baixados agora: {baixados_agora}")
print(f"Erros / Não encontrados: {erros}")