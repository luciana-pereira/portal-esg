import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { addEsgContent } from '../../store/slices/esgSlice';
import { storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadContent: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { control, handleSubmit } = useForm();
  const dispatch: AppDispatch = useDispatch(); // Tipar dispatch corretamente

  const onSubmit = async (data: any) => {
    if (user) {
      const file = data.file[0];
      const storageRef = ref(storage, `esgUploads/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      dispatch(addEsgContent({
        userId: user.uid,
        description: data.description,
        fileURL,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="file"
        control={control}
        render={({ field }) => <input type="file" {...field} />}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <input type="text" placeholder="Description" {...field} />}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadContent;
