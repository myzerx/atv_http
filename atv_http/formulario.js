import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

export default class Via extends Component {
  // state
  state = {
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  };
  // PEGAR O CEP DIGITADO
  campoCEP = (text) => {
    this.setState({ cep: text });
    //alert(this.state.cep);
  };
  // mostra o cep quando digitado, somente quando perde o focus

  buscaCep = () => {
    //alert(this.state.cep);
    // http fetch
    //alert( "https://viacep.com.br/ws/"+ this.state.cep+"/json/");

    fetch("https://viacep.com.br/ws/" + this.state.cep + "/json/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.localidade);
        // fazer as mudança no estado da variaveis
        this.setState({
          rua: json.logradouro,
          bairro: json.bairro,
          cidade: json.localidade,
          estado: json.uf,
        });
      })
      .catch((erro) => {
        console.error(erro);
      });
  };

  render() {
    return (
      <View>
        <Text style={estilo.label}>CEP</Text>
        <TextInput
          style={estilo.input}
          onChangeText={this.campoCEP}
          onBlur={this.buscaCep}
        />

        <Text style={estilo.label}>Logradouro</Text>
        <TextInput style={estilo.input} value={this.state.rua} />

        <Text style={estilo.label}>Numero</Text>
        <TextInput style={estilo.input} value={this.state.numero} />

        <Text style={estilo.label}>Bairro</Text>
        <TextInput style={estilo.input} value={this.state.bairro} />

        <Text style={estilo.label}>Cidade</Text>
        <TextInput style={estilo.input} value={this.state.cidade} />

        <Text style={estilo.label}>Estado</Text>
        <TextInput style={estilo.input} value={this.state.estado} />
        <View style={{ marginTop: 30, color: "black" }}>
          <Button color="#9933ff" title="CADASTRAR" />
        </View>
      </View>
    );
  }
}
const estilo = StyleSheet.create({
  label: {
    color: "white",
    marginTop: 10,
    marginLeft: 15,
  },
  input: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
});
