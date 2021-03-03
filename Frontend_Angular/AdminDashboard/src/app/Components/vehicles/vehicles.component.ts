import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from 'src/app/Models/vehicle';
import { AlertService } from 'src/app/_alert';
import { VehicledataService } from '../../Services/vehicledata.service';

export interface IVehicle {
  id: number;
  modelMaster: IModel;
  name: string;
  shortDiscription: string;
  modelYear: string;
  vINNum: string;
  licencePlate: string;
  averageUsage: string;
  kilometers: number;
  seatingCapicity: number;
  engine: string;
  bodyType: string;
  fuelType: string;
  numOfAirbags: number;
  numOfDoors: number;
  vehicleConfiguration: string;
  wheelbase: string;
  color: string;
  fuelCapacity: number;
  cargoVolume: number;
  salesPrice: number;
  modelId: string;
  brandId: string;
}

export interface IModel {
  id: number;
  name: string;
  shortDiscription: string;
  modelYear: string;
  brandId: number;
  brand: IBrand;
}

export interface IBrand {
  id: number;
  name: string;
  shortDiscription: string;
}

// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: any[];

  displayedColumns: string[] = [
    'id',
    'vINNum',
    'licencePlate',
    'salesPrice',
    'BrandId',
    'ModelId',
    'fuelType',
    'color'
  ];
  dataSource: MatTableDataSource<IVehicle>;
  selection: SelectionModel<IVehicle>;

  name = '';

  filterCheckboxes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  nameList: string[]=[] ;
  names = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehicleServie: VehicledataService,
    private route: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {

    this.vehicleServie.getAllBrands().subscribe((data:any[]) => {
      data.forEach(element => {
        this.nameList.push(element.name)
      })
    })

    this.vehicleServie.getAllVehicles().subscribe((data: any) => {
      this.vehicles = data;
      console.log(this.vehicles);
      this.dataSource = new MatTableDataSource(this.vehicles);
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'ModelId': return item.modelMaster.name;
          case 'BrandId': return item.modelMaster.brand.name;
          default: return item[property];
        }
      };

      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.modelMaster.name + data.modelMaster.brand.name ;
        return dataStr.indexOf(filter) != -1; 
      }

      this.selection = new SelectionModel(true, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customApplyFilter(name: string) {
    this.dataSource.filter = name;
  }

  customFiltered() {
    return (data, filter) => {
      if (this.name) return data.name == this.name;

      return true;
    };
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IVehicle): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }




  onEdit(id) {
    this.route.navigate(['/addvehicle', id]);
  }

  onDelete(id) {
    this.vehicleServie.deleteVehicle(id).subscribe(
      (data) => {
        console.log(data);
        this.alertService.success('Vehicle Deleted!');
        location.reload();
      },
      (error) => {
        this.alertService.error(error.error);
      }
    );
  }
}
