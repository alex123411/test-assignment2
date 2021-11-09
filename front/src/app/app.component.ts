import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

interface Movie{
  id: string;
  name: string;
  genre1: string;
  genre2: string;
  year: string;
}

interface GetMoviesResponse {
  movies: Movie[];
}

interface ErrorResponse {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public movies: Movie[] = [];
  public year: string | undefined;
  public genre: string | undefined;
  public genreControl = new FormControl()
  public yearControl = new FormControl(0)

  private getUserInfoURL = 'http://localhost:8081/api/movies/?';

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.getMovies()

  }

  getMovies(){
    const filters: {year?: string, genre?:string} = {}
    if (this.year !== undefined){
      filters.year = this.year
    }
    if (this.genre !== undefined){
      filters.genre = this.genre
    }
    this.http.get<GetMoviesResponse>(this.getUserInfoURL, {params: {...filters}})
      .subscribe(
        res => {this.movies = res.movies},
        (err: ErrorResponse)  => alert(err.message)
      )
      
  }

  genreHandler(event: Event){
    this.genre = (event.target as HTMLInputElement).value
  }

  public yearHandler(event: Event){
    this.year = (event.target as HTMLInputElement).value
  }

  buttonSearch(){

    console.log(this.year, this.genre)
    this.getMovies()
  }

}
