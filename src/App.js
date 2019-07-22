import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";

class App extends Component {
  // Render생성: componentWillMount() -> render() -> componentDidMount()
  // 화면Update :  componentWillReceiveProps() -> shouldComponentUpdate() *state -> componentWillUpdate() -> render() -> componentDidUpdate()

  // state초기화
  state = {};

  // 컴포넌트가 화면에 나타났을때 호출
  componentDidMount() {
    this._getMovies();
  }

  // 비동기방식으로 영화정보 Api콜
  _getMovies = async () => {
    const movies = await this._callApi();

    // state설정
    this.setState({
      movies
    });
  };

  // fetch : 네트워크 요청을 쉽게 사용 ex) api사용
  // promise 반환으로인한 비동기처리
  _callApi = () => {
    return fetch(
      "https://yts.am/api/v2/list_movies.json?sort_by=rating"
    )
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  

// 렌더링
// 무비컴포넌트로 데이터 전달
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };
 
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
