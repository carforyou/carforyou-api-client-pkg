import {
  Listing as ListingType,
  SearchListing as SearchListingType
} from "../../src/types/models/listing"

const defaults: ListingType = {
  id: 12,
  active: true,
  make: "Audi",
  makeKey: "audi",
  model: "A3",
  modelKey: "a3",
  type: "sport",
  typeFull: "sport",
  price: 1234532,
  firstRegistrationDate: { month: 6, year: 2015 },
  createdDate: "2018-01-01",
  mileage: 1234098,
  horsePower: 150,
  transmissionType: "manuell",
  externalListingId: "12587469365",
  fuelType: "petrol-cat",
  fuelTypeGroup: "petrol",
  consumption: 8.5,
  gbdScore: "good-deal",
  dealer: {
    id: 1,
    name: "emil frey",
    phone: "231-342-32",
    email: "dealera@autoricardo.ch",
    city: "Zurich",
    address: "Bahnhof Strasse 123",
    zipCode: "8001",
    location: {
      lat: 47.3742951,
      lon: 8.5385763
    }
  },
  images: [
    {
      id: 1000001,
      externalUrl: "../../static/images/placeholder.png",
      s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor.jpg"
    },
    {
      id: 1000002,
      externalUrl: "../../static/images/placeholder.png",
      s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor-1.jpg"
    }
  ],
  productionStartDate: "2009-06-01",
  productionEndDate: "2016-06-01",
  bodyType: "saloon",
  vehicleClass: "large-family",
  doors: 5,
  cubicCapacity: 1996,
  cylinders: 0,
  kiloWatts: 59,
  driveType: "front",
  gears: 6,
  seats: 5,
  weight: 1001,
  weightTotal: 1600,
  consumptionUrban: 9.5,
  consumptionExtraUrban: 6.7,
  consumptionStandard: "eg99-100",
  consumptionCategory: "A",
  co2Emission: 45,
  payload: 500,
  wheelbase: 132,
  towingCapacity: 1000,
  factoryCode: "123ABC",
  equipmentPackage: "COOL",
  fuelTankCapacity: 70,
  range: 153,
  euroStandard: "5",
  productionYear: 2014,
  conditionType: "used",
  bodyColor: "red",
  bodyColorGroup: "red",
  interiorColor: "black",
  interior: "leder",
  externalNote: "This is external note",
  standardOptions: [],
  additionalOptions: [],
  lastInspectionDate: { month: 6, year: 2015 },
  inspected: true,
  hasWarranty: true,
  warrantyDuration: 12,
  warrantyName: "Warranty1",
  warrantyType: "from-date",
  warrantyStartDate: "2015-01-01",
  metallic: true,
  description: "This is description...",
  hadAccident: false,
  hasMbg: false,
  hasServiceHistory: true,
  lifecycleState: "active",
  deactivationDate: null,
  spin360Code: null,
  source: "MANUAL",
  publishingStatus: "published",
  publishingDate: "2015-10-10",
  typeId: 134,
  frameNumber: "123456",
  serialNumber: "123456",
  tsn: "1234567890",
  consumptionCombined: 8.5,
  systemPerformanceKiloWatts: null,
  directImport: false,
  hasAdditionalTyres: true,
  hasRoofRack: false,
  hasDogGrid: false,
  handicappedAccessible: false,
  tuned: false,
  racingCar: false
}

export function Listing(attributes = {}): ListingType {
  return { ...defaults, ...attributes }
}

export function SearchListing(attributes = {}): SearchListingType {
  return {
    makeId: 1028,
    modelId: 1049,
    ...Listing(attributes)
  }
}
