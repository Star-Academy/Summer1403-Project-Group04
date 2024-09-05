import { TestBed } from '@angular/core/testing';
import { PermisionsService } from './permisions.service';

describe('PermisionsService', () => {
  let service: PermisionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisionsService);
  });

  it('SHOULD be created WHEN ever', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD set permissions WHEN setPermissions is called', () => {
    // Arrange
    const permissions = ['permission1', 'permission2'];

    // Act
    service.setPermissions(permissions);

    // Assert
    expect(service.getPermissions()).toEqual(permissions);
  });

  it('SHOULD clear permissions WHEN clearPermissions is called', () => {
    // Arrange
    const permissions = ['permission1', 'permission2'];
    service.setPermissions(permissions);

    // Act
    service.clearPermissions();

    // Assert
    expect(service.getPermissions()).toEqual([]);
  });

  it('SHOULD return the current permissions WHEN getPermissions is called', () => {
    // Arrange
    const permissions = ['permission1', 'permission2'];
    service.setPermissions(permissions);

    // Act
    const result = service.getPermissions();

    // Assert
    expect(result).toEqual(permissions);
  });

  it('SHOULD emit permissions updates WHEN setPermissions is called', (done) => {
    // Arrange
    const permissions = ['permission1', 'permission2'];

    // Act
    service.setPermissions(permissions);

    // Assert
    service.permissions$.subscribe((updatedPermissions) => {
      expect(updatedPermissions).toEqual(permissions);
      done();
    });
  });

  it('SHOULD emit an empty array WHEN clearPermissions is called', (done) => {
    // Arrange
    const permissions = ['permission1', 'permission2'];
    service.setPermissions(permissions);

    // Act
    service.clearPermissions();

    // Assert
    service.permissions$.subscribe((updatedPermissions) => {
      expect(updatedPermissions).toEqual([]);
      done();
    });
  });
});
