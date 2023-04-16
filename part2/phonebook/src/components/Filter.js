const Filter = ({ filterName, setFilterName }) => {
  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterName} />
    </div>
  )
}

export default Filter