# 📌 Planejamento de Sistema Interno (1 mês e meio)

## ✅ Funcionalidades Priorizadas - orçamento (R$ 7.000)

**Stack técnica:**

- Frontend: ReactJS + TypeScript
- Backend: Bun.js(Node) + TypeScript
- Banco de dados: NoSQL(MongoDB)

---

## 💵 Custo médio mensal de infraestrutura (100 usuários/dia)

| Recurso                        | Estimativa mensal | Comentário                                  |
| ------------------------------ | ----------------- | ------------------------------------------- |
| Banco NoSQL (MongoDB/Firebase) | R$ 60 a R$ 100    | Plano gratuito ou básico para 100 users/dia |
| Armazenamento (S3/Firebase)    | R$ 30 a R$ 70     | Dependente do volume de arquivos            |
| Backend (Bun.js hospedado)     | R$ 30 a R$ 80     | Via Railway, Render, VPS, etc.              |
| Frontend (Vercel/Netlify)      | R$ 0 a R$ 30      | Gratuito em planos básicos                  |

**💡 Total estimado mensal: R$ 120 a R$ 250**

---

## 💰 Orçamento disponível

- Valor máximo: **R$ 7.000**
- Pagamento em 3 parcelas:
  - 🪙 1ª parcela (início): R$ 2.500
  - 🪙 2ª parcela (meio do projeto): R$ 2.500
  - 🪙 3ª parcela (entrega final): R$ 2.000

---

### 🔥 Fase 1 — MVP (Semana 1 a 3)

1. [ ] **Deploy inicial (Beta) + Setup CI/CD + Automação básica**

   - 💵 Incluso na margem do projeto
   - ⏱️ Estimativa: **1 dia útil**
   - Setup de ambiente, deploy de preview e CI básico para facilitar QA e staging

2. [ ] **Gestão básica de usuários (CRUD)**

   - 💵 R$ 800
   - ⏱️ Estimativa: **2 dias úteis**
   - Criação, edição e desativação de usuários

3. [ ] **Sistema de permissões e perfis de acesso**

   - 💵 R$ 2.000
   - ⏱️ Estimativa: **4 a 5 dias úteis**
   - Perfis de usuário, checagens no backend, middleware no frontend

4. [ ] **Upload de arquivos**

   - 💵 R$ 1.200
   - ⏱️ Estimativa: **2 a 3 dias úteis**
   - Suporte a PDF/imagens, preview e integração com storage

5. [ ] **Postagens e comentários**

   - 💵 R$ 1.000
   - ⏱️ Estimativa: **3 dias úteis**
   - CRUD de posts, comentários vinculados a usuários

6. [ ] **Links internos/externos nas postagens**

   - 💵 R$ 300
   - ⏱️ Estimativa: **1 dia útil**
   - Detecção de links, opção de abertura interna ou externa

7. [ ] **Calendário interno**
   - 💵 R$ 800
   - ⏱️ Estimativa: **2 dias úteis**
   - Visualização por mês, eventos e integração básica com postagens

---

### ⏳ Total estimado de desenvolvimento

- **Total em dias úteis: 30 a 40 dias**
- **Total em semanas: ~5 semanas**

---

## 📆 Cronograma refinado (ordem cronológica)

| Semana | Entregas previstas                                                                   |
| ------ | ------------------------------------------------------------------------------------ |
| 1      | ✅ Setup de projeto e deploy beta<br>✅ Gestão de usuários<br>🚧 Permissões (início) |
| 2      | ✅ Permissões (final)<br>✅ Uploads<br>🚧 Início das postagens                       |
| 3      | ✅ Postagens<br>✅ Links internos/externos<br>✅ Calendário                          |
| 4–6    | 🔄 QA geral, testes com usuários, documentação, ajustes, deploy final                |
