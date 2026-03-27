import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
};

export function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    const response = await axios.get("http://localhost:3333/users");
    setUsers(response.data);
  }

  async function handleCreateUser() {
    if (!name || !email) return;

    await axios.post("http://localhost:3333/users", {
      name,
      email,
    });

    setName("");
    setEmail("");
    await fetchUsers();
  }

  async function handleDeleteUser(id: string) {
    await axios.delete(`http://localhost:3333/users/${id}`);
    await fetchUsers();
  }

  useEffect(() => {
    async function loadUsers() {
      await fetchUsers();
    }

    void loadUsers();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
        color: "#e4e4e7",
        display: "flex",
        justifyContent: "center",
        padding: 32,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h1 style={{ marginBottom: 24, color: "#a855f7" }}>CRUD de Usuários</h1>

        <div
          style={{
            background: "#18181b",
            padding: 20,
            borderRadius: 12,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
          }}
        >
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #27272a",
              background: "#0f0f11",
              color: "#fff",
              outline: "none",
            }}
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #27272a",
              background: "#0f0f11",
              color: "#fff",
              outline: "none",
            }}
          />

          <button
            onClick={handleCreateUser}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: "#7c3aed",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Cadastrar
          </button>
        </div>

        <ul style={{ padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                background: "#18181b",
                border: "1px solid #27272a",
                padding: 16,
                marginBottom: 12,
                borderRadius: 12,
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong style={{ color: "#fff" }}>{user.name}</strong>
                <p style={{ color: "#a1a1aa", margin: 0 }}>{user.email}</p>
              </div>

              <button
                onClick={() => handleDeleteUser(user.id)}
                style={{
                  background: "transparent",
                  border: "1px solid #7c3aed",
                  color: "#a855f7",
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
