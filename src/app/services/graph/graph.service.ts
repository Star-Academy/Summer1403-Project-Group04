import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../../models/api-response';
import { environment } from '../../../environments/environment';
import { nodeData } from '../../models/node-data';
import { edgeData } from '../../models/edge-data';
import { graphRecords } from '../../models/graph-records';
import { graphCategory } from '../../models/graph-category';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  private URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  addNodeCategory(nodeCategory: string) {
    const data = { nodeCategoryName: nodeCategory };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<APIResponse>(`${this.URL}/api/Node/categories`, data, { headers, withCredentials: true });
  }

  getNodeCategories() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<string[]>(`${this.URL}/api/Node/categories`, { headers, withCredentials: true });
  }

  uploadNodeData(data: FormData) {
    return this.http.post<APIResponse>(`${this.URL}/api/Node`, data, { withCredentials: true });
  }

  addEdgeCategory(edgeCategory: string) {
    const data = { edgeCategoryName: edgeCategory };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<APIResponse>(`${this.URL}/api/Edge/categories`, data, { headers, withCredentials: true });
  }

  getEdgeCategories() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<string[]>(`${this.URL}/api/Edge/categories`, { headers, withCredentials: true });
  }

  uploadEdgeData(data: FormData) {
    return this.http.post<APIResponse>(`${this.URL}/api/Edge`, data, { withCredentials: true });
  }

  getGraph() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<graphRecords>(`${this.URL}/api/Graph`, { headers, withCredentials: true });
  }

  getNodeById(id: string) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<nodeData>(`${this.URL}/api/Node?nodeId=${parseInt(id)}`, { headers, withCredentials: true });
  }

  getEdgeById(id: string) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<edgeData>(`${this.URL}/api/Edge?edgeId=${parseInt(id) + 1}`, {
      headers,
      withCredentials: true,
    });
  }

  getNeighboursById(id: number, categories: graphCategory) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<graphRecords>(
      `${this.URL}/api/Graph/expansion?nodeId=${id}&sourceCategoryName=${categories.sourceCategoryName}&targetCategoryName=${categories.targetCategoryName}&edgeCategoryName=${categories.edgeCategoryName}`,
      { headers, withCredentials: true }
    );
  }
}
