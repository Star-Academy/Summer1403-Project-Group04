import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginResponse } from '../../models/login-response';
import { environment } from '../../../environments/environment';
import { nodeData } from '../../models/node-data';
import { edgeData } from '../../models/edge-data';

@Injectable({
  providedIn: 'root',
})
export class UploadGraphService {
  private URL = environment.API_URL;
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

  uploadNodeData(data: FormData) {
    
    return this.http.post<loginResponse>(`${this.URL}/api/Node`, data, {withCredentials: true});
  }

  addEdgeCategory(edgeCategory: string) {
    const data = { edgeCategoryName: edgeCategory };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<loginResponse>(`${this.URL}/api/Edge/categories`, data, { headers, withCredentials: true });
  }

  getEdgeCategories() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<string[]>(`${this.URL}/api/Edge/categories`, { headers, withCredentials: true });
  }

  uploadEdgeData(data: FormData){
    return this.http.post<loginResponse>(`${this.URL}/api/Edge`, data, {withCredentials: true});
  }

  getGraph(){
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<{nodes: {id:string , label:string}[] , edges: {id:string , source:string , target: string}[]}>(`${this.URL}/api/Graph`, { headers, withCredentials: true });
  }

  getNodeById(id:string){
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<nodeData>(`${this.URL}/api/Node?nodeId=${parseInt(id)}`, { headers, withCredentials: true });
  }

  getEdgeById(id:string) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<edgeData>(`${this.URL}/api/Edge?edgeId=${parseInt(id) + 1}`, { headers, withCredentials: true });
  }
}
