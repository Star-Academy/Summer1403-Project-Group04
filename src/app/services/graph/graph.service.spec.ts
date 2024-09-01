import { TestBed } from '@angular/core/testing';
import { GraphService } from './graph.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../models/api-response';
import { nodeData } from '../../models/node-data';
import { edgeData } from '../../models/edge-data';
import { graphRecords } from '../../models/graph-records';
import { graphCategory } from '../../models/graph-category';
import { of } from 'rxjs';

describe('GraphService', () => {
  let service: GraphService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const API_URL = environment.API_URL;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [GraphService, { provide: HttpClient, useValue: spy }],
    });

    service = TestBed.inject(GraphService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD call post method with proper data WHEN addNodeCategory is called', () => {
    // Arrange
    const nodeCategory = 'Category1';
    const mockResponse: APIResponse = { message: 'Success' };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.addNodeCategory(nodeCategory).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Node/categories`);
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual({ nodeCategoryName: nodeCategory });
  });

  it('SHOULD call get method WHEN getNodeCategories is called', () => {
    // Arrange
    const mockResponse: string[] = ['Category1', 'Category2'];
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getNodeCategories().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Node/categories`);
  });

  it('SHOULD call post method with FormData WHEN uploadNodeData is called', () => {
    // Arrange
    const formData = new FormData();
    const mockResponse: APIResponse = { message: 'Success' };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.uploadNodeData(formData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Node`);
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toBe(formData);
  });

  it('SHOULD call post method with proper data WHEN addEdgeCategory is called', () => {
    // Arrange
    const edgeCategory = 'EdgeCategory1';
    const mockResponse: APIResponse = { message: 'Success' };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.addEdgeCategory(edgeCategory).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Edge/categories`);
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual({ edgeCategoryName: edgeCategory });
  });

  it('SHOULD call get method WHEN getEdgeCategories is called', () => {
    // Arrange
    const mockResponse: string[] = ['EdgeCategory1', 'EdgeCategory2'];
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getEdgeCategories().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Edge/categories`);
  });

  it('SHOULD call post method with FormData WHEN uploadEdgeData is called', () => {
    // Arrange
    const formData = new FormData();
    const mockResponse: APIResponse = { message: 'Success' };
    httpClientSpy.post.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.uploadEdgeData(formData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Edge`);
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toBe(formData);
  });

  it('SHOULD call get method WHEN getGraph is called', () => {
    // Arrange
    const mockResponse: graphRecords = { nodes: [], edges: [] };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getGraph().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Graph`);
  });

  it('SHOULD call get method with nodeId WHEN getNodeById is called', () => {
    // Arrange
    const nodeId = '1';
    const mockResponse: nodeData = {
      AccountType: 'heb',
      BranchAdress: 'very very large heb',
      BranchName: 'hebsh',
      BranchTelephone: '0-555-265425',
      CardID: '1234567899',
      IBAN: '1236549865432',
      OwnerID: '1',
      OwnerLastName: 'Hebshian',
      OwnerName: 'Hebsh',
    };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getNodeById(nodeId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Node?nodeId=1`);
  });

  it('SHOULD call get method with edgeId WHEN getEdgeById is called', () => {
    // Arrange
    const edgeId = '1';
    const mockResponse: edgeData = {
      SourceAcount: '1',
      DestiantionAccount: '2',
      Amount: '1500000',
      Date: '12/12/2020',
      Type: 'Transfer',
    };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getEdgeById(edgeId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${API_URL}/api/Edge?edgeId=2`);
  });

  it('SHOULD call get method with proper params WHEN getNeighboursById is called', () => {
    // Arrange
    const id = 1;
    const categories: graphCategory = {
      sourceCategoryName: 'Category1',
      targetCategoryName: 'Category2',
      edgeCategoryName: 'EdgeCategory1',
    };
    const mockResponse: graphRecords = { nodes: [], edges: [] };
    httpClientSpy.get.and.returnValue(of(mockResponse));

    // Act

    // Assert
    service.getNeighboursById(id, categories).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(
      `${API_URL}/api/Graph/expansion?nodeId=${id}&sourceCategoryName=${categories.sourceCategoryName}&targetCategoryName=${categories.targetCategoryName}&edgeCategoryName=${categories.edgeCategoryName}`
    );
  });
});
