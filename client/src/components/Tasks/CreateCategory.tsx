export default function CreateCategory() {
  return (
    <div className='create'>
      <h1>Create Category</h1>
      <form>
        <input type='text' placeholder='Category Name' />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
