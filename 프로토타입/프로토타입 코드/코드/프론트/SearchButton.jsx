import * as React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

export default function SearchButton({ onClick, text, color }) {
  return (
    <S.Button variant="contained" onClick={onClick} style={{backgroundColor: color}}>{text}</S.Button>
  );
}

const S = {
  Button: styled(Button)`
    width: fit-content;
    font-size: 12px;
    height: 55px;
  `,
}
