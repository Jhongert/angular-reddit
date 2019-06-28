import { Component } from '@angular/core';
import { Article } from './article/article.model';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];
  form: FormGroup;
  submitted = false;
  reg = '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$';

  constructor(fb: FormBuilder){
    this.form = fb.group({
      'title': ['', Validators.required],
      'link': ['', [Validators.required,Validators.pattern(this.reg)]]
    });

    this.articles = [
      new Article('Portfolio', 'http://www.jhongertf.com/', 12),
      new Article('Hangman Game', 'https://jhongert.github.io/hangman-game/', 10),
      new Article('Trivia Game', 'https://jhongert.github.io/TriviaGame/', 8),
    ]
  }

  get f() { return this.form.controls; }

  addArticle(form: any): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
  }

    console.log(`Adding article title: ${form.title} and link: ${form.link}`);
    this.articles.push(new Article(form.title, form.link, 0));
    this.form.reset();
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}
