import useFetch from "./hook/useFetch";

function App() {
  const { loading, error, data } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(data !== null ? data.length : "");
  return (
    <div>
      {loading && <span>loading...</span>}
      {error && <span>{error}</span>}
      {data !== null ? (
        <p>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
