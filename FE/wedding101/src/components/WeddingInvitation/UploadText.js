// 청첩장 문구 component
import './UploadText.css';

import { TextField} from '@mui/material/';
import { useState } from 'react';

const UploadText = () => {
    const [form, setForm] = useState({
        textInput01: '',
        textInput02: '',
        textInput03: '',
    });

    const onChange = (e)=> {
        const newForm = {
            ...form,
            [e.target.name] : e.target.value
        };
        setForm(newForm);
    }

    return(
        <div>
            <TextField
          id='password-input'
          type='text'
          label='문구를 입력하세요'
          variant='outlined'
          value={form.textInput01}
          onChange={onChange}
        /> <br />
        <TextField
          id='password-input'
          type='text'
          label='문구를 입력하세요'
          variant='outlined'
          value={form.textInput02}
          onChange={onChange}
        /> <br />
        <TextField
          id='password-input'
          type='text'
          label='문구를 입력하세요'
          variant='outlined'
          value={form.textInput03}
          onChange={onChange}
        /> <br />

        </div>
    );
}

export default UploadText;