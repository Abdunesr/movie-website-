import Star from "./Star";

function App() {
  return (
    <div>
      <Star maxRating={8} size={32} color={"red"} />
      <Star maxRating={2} size={65} color={"blue"} />
    </div>
  );
}

export default App;
