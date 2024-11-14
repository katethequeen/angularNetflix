import { Injectable } from '@angular/core';
import { iAccount } from '../model/i-account';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl: string = environment.accountUrl;

  constructor(private http: HttpClient) {}

  getAllAccount(): Observable<iAccount[]> {
    return this.http.get<iAccount[]>(this.apiUrl);
  }

  getAccountById(id: number): Observable<iAccount> {
    return this.http.get<iAccount>(`${this.apiUrl}/${id}`);
  }

  createAccount(newAccount: Partial<iAccount>): Observable<iAccount> {
    return this.http.post<iAccount>(this.apiUrl, newAccount);
  }

  modifyAccount(account: iAccount): Observable<iAccount> {
    return this.http.put<iAccount>(`${this.apiUrl}/${account.id}`, account);
  }

  deleteAccount(id: number): Observable<iAccount> {
    return this.http.delete<iAccount>(`${this.apiUrl}/${id}`);
  }
}
