import React from "react";
import { useForm } from "react-hook-form";
import Main from "./components/Main";
import Form from "./components/Form";
import Label from "./components/Field/Label";


function App() {

  const {register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e) => {
    console.log(e);

  }
  
  const buscarCep = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep)

    if(!e.target.value) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/ `)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setValue('logradouro', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('localidade', data.localidade);
      setValue('uf', data.uf);
      setFocus('uf');
    })
    .catch((error) => console.log(error));
  }

  return (
    <Main>
      <Form onSubmit={handleSubmit(onSubmit)} >
      <h1>Consultar CEP</h1>
        
        <Label>
          <span>CEP:</span>
          <input type="text" {...register("cep")} onBlur={buscarCep} />
        </Label>
        <Label>
          <span>Logradouro:</span>
          <input type="text" {...register("logradouro")} />
        </Label>
        <Label>
          <span>Bairro:</span>
          <input type="text" {...register("bairro")} />
        </Label>
        <Label>
          <span>Cidade:</span>
          <input type="text" {...register("localidade")} />
        </Label>
        <Label>
          <span>UF:</span>
          <input type="text" {...register("uf")} />
        </Label>
        <button type="submit" >
          Buscar
        </button>
      </Form>
    </Main>
  );
}

export default App;
