export default function PageButtons({ page, setPage }) {
  console.log(page);

  return (
    <div className="results-buttons" id="page-buttons">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >{`<<`}</button>
      <p>{page}</p>
      <button onClick={() => setPage(page + 1)}>{`>>`}</button>
    </div>
  );
}
