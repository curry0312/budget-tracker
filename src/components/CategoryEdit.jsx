import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../features/categoriesSlice';

function CategoryEdit({category}) {
  const dispatch = useDispatch()
  return (
    <div className='flex space-x-2 bg-gray-100 shadow-lg cursor-pointer p-3 rounded-md'>
      <div>
        <p className='font-Tilt text-lightblue-ocean'>{category.label}</p>
      </div>
      <div>
        <button onClick={()=>dispatch(deleteCategory(category))} className='hover:scale-110'>
            <DeleteIcon sx={{color: "red"}}/>
        </button>
      </div>
    </div>
  )
}

export default CategoryEdit
