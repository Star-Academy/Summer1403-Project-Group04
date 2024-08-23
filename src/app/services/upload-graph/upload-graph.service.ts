import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class UploadGraphService {
  private URL = 'http://localhost:5293';
  constructor(private http: HttpClient) {}

  addNodeCategory(nodeCategory: string) {
    const data = { nodeCategoryName: nodeCategory };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<loginResponse>(`${this.URL}/api/Node/categories`, data, { headers, withCredentials: true });
  }

  getNodeCategories() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<string[]>(`${this.URL}/api/Node/categories`, { headers, withCredentials: true });
  }

  // uploadNodeData(data: any) {
    
  //   const headers = { 'Content-Type': 'application/json' };

  //   return this.http.post<loginResponse>(`${this.URL}/api/Node`, data, { headers, withCredentials: true });
  // }

  addEdgeCategory(edgeCategory: string) {
    const data = { edgeCategoryName: edgeCategory };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<loginResponse>(`${this.URL}/api/Edge/categories`, data, { headers, withCredentials: true });
  }

  getEdgeCategories() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<loginResponse>(`${this.URL}/api/Edge/categories`, { headers, withCredentials: true });
  }
}
