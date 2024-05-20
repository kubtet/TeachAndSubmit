import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Teach&Submit';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const users = await firstValueFrom(
      this.http.get('https://localhost:5001/api/users')
    );
    console.log(users);
  }
}
