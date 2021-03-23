import { Type } from "../../types/models/type"
import {
  Listing as ListingType,
  SearchListing as SearchListingType,
} from "../../types/models/listing"
import { DealerSourceGroup, DealerType } from "../../types/models/index"

const defaults: ListingType = {
  id: 12,
  active: true,
  make: "Audi",
  makeKey: "audi",
  model: "A3",
  modelKey: "a3",
  type: "sport",
  typeFull: "sport",
  typeSlug: "sport",
  price: 1234532,
  listPrice: 123456,
  leasingMonthlyRate: 295.87,
  firstRegistrationDate: { month: 6, year: 2015 },
  firstRegistrationYear: 2015,
  createdDate: "2018-01-01",
  mileage: 1234098,
  horsePower: 150,
  transmissionType: "manuell",
  externalListingId: "12587469365",
  fuelType: "petrol-cat",
  fuelTypeGroup: "petrol",
  consumptionCombined: 8.5,
  gbdScore: "good-deal",
  dealerId: 1,
  images: [
    {
      id: 1000001,
      externalUrl: "../../static/images/placeholder.png",
      s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor.jpg",
    },
    {
      id: 1000002,
      externalUrl: "../../static/images/placeholder.png",
      s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor-1.jpg",
    },
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
  generalExternalNote: "General external note",
  standardOptions: [],
  additionalOptions: [],
  nextInspectionIncluded: false,
  deliveryFeeIncluded: false,
  vignetteIncluded: false,
  fullTankIncluded: false,
  expertInstructionIncluded: false,
  otherServices: "",
  lastInspectionDate: { month: 6, year: 2015 },
  inspected: true,
  hasWarranty: true,
  warrantyDuration: 12,
  warrantyName: "Warranty1",
  warrantyType: "from-date",
  warrantyDetails: "",
  warrantyMileage: 10000,
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
  systemPerformanceKiloWatts: null,
  directImport: false,
  hasAdditionalTyres: true,
  hasRoofRack: false,
  hasDogGrid: false,
  handicappedAccessible: false,
  tuned: false,
  racingCar: false,
  enabledFeatures: [
    {
      feature: "premium-listing",
      endDate: "2015-10-10",
      startDate: "2015-09-09",
    },
  ],
  buyNowEligible: false,
  buyNowInProgress: false,
  transferredToManual: false,
  hidden: false,
  useDefaultAdditionalServices: false,
  useDefaultDescription: false,
  useDefaultWarranty: false,
}

export function Listing(attributes = {}): ListingType {
  return { ...defaults, ...attributes }
}

export function SearchListing(attributes = {}): SearchListingType {
  const { typeSlug } = { typeSlug: "test-slug", ...attributes }
  return {
    typeSlug,
    dealer: {
      id: 1,
      name: "emil frey",
      phone: "231-342-32",
      email: "dealera@autoricardo.ch",
      city: "Zurich",
      address: "Bahnhof Strasse 123",
      zipCode: "8001",
      location: {
        country: "Switzerland",
        lat: 47.3742951,
        lon: 8.5385763,
        region: "ZH",
        regionFull: "Zurich",
      },
      country: "Switzerland",
      region: "ZH",
      regionFull: "Zurich",
      dealerType: DealerType.professional,
      dealerSourceGroup: DealerSourceGroup.carforyou,
    },
    ...Listing(attributes),
  }
}

export function EmptyListing(): ListingType {
  return {
    id: undefined,
    make: undefined,
    model: undefined,
    typeFull: undefined,
    typeSlug: undefined,
    makeKey: undefined,
    modelKey: undefined,
    typeId: undefined,
    doors: undefined,
    seats: undefined,
    bodyColor: undefined,
    bodyType: undefined,
    interiorColor: undefined,
    metallic: undefined,
    productionYear: undefined,
    firstRegistrationDate: undefined,
    firstRegistrationYear: undefined,
    mileage: undefined,
    lastInspectionDate: undefined,
    inspected: undefined,
    price: undefined,
    listPrice: undefined,
    leasingMonthlyRate: undefined,
    tsn: undefined,
    frameNumber: undefined,
    serialNumber: undefined,
    externalListingId: undefined,
    fuelType: undefined,
    consumptionCategory: undefined,
    euroStandard: undefined,
    consumptionCombined: undefined,
    consumptionExtraUrban: undefined,
    consumptionUrban: undefined,
    systemPerformanceKiloWatts: undefined,
    transmissionType: undefined,
    horsePower: undefined,
    driveType: undefined,
    cubicCapacity: undefined,
    cylinders: undefined,
    gears: undefined,
    weight: undefined,
    payload: undefined,
    towingCapacity: undefined,
    images: [],
    description: undefined,
    externalNote: undefined,
    generalExternalNote: undefined,
    directImport: undefined,
    hasServiceHistory: undefined,
    hasAdditionalTyres: undefined,
    hasRoofRack: undefined,
    hasDogGrid: undefined,
    handicappedAccessible: undefined,
    hadAccident: undefined,
    tuned: undefined,
    racingCar: undefined,
    additionalOptions: [],
    standardOptions: [],
    productionStartDate: undefined,
    productionEndDate: undefined,
    publishingStatus: undefined,
    active: undefined,
    bodyColorGroup: undefined,
    co2Emission: undefined,
    conditionType: undefined,
    consumptionStandard: undefined,
    createdDate: undefined,
    deactivationDate: undefined,
    dealerId: undefined,
    equipmentPackage: undefined,
    factoryCode: undefined,
    fuelTankCapacity: undefined,
    fuelTypeGroup: undefined,
    gbdScore: undefined,
    hasMbg: undefined,
    hasWarranty: undefined,
    interior: undefined,
    kiloWatts: undefined,
    lifecycleState: undefined,
    publishingDate: undefined,
    range: undefined,
    source: undefined,
    spin360Code: undefined,
    type: undefined,
    vehicleClass: undefined,
    warrantyDuration: undefined,
    warrantyName: undefined,
    warrantyStartDate: undefined,
    warrantyDetails: undefined,
    warrantyMileage: undefined,
    warrantyType: undefined,
    weightTotal: undefined,
    wheelbase: undefined,
    enabledFeatures: [],
    buyNowEligible: false,
    buyNowInProgress: false,
    transferredToManual: false,
    hidden: false,
    nextInspectionIncluded: undefined,
    deliveryFeeIncluded: undefined,
    vignetteIncluded: undefined,
    fullTankIncluded: undefined,
    expertInstructionIncluded: undefined,
    otherServices: undefined,
    useDefaultAdditionalServices: undefined,
    useDefaultDescription: undefined,
    useDefaultWarranty: undefined,
  }
}

export function ListingFromType({
  bodyType,
  make,
  makeKey,
  model,
  fullName,
  modelKey,
  doors,
  seats,
  tsn,
  fuelType,
  consumptionCategory,
  euroStandard,
  consumptionCombined,
  consumptionExtraUrban,
  consumptionUrban,
  systemPerformanceKiloWatts,
  transmissionType,
  horsePower,
  driveType,
  cubicCapacity,
  cylinders,
  gears,
  weight,
  payload,
  towingCapacity,
  productionEndDate,
  productionStartDate,
  id,
}: Type): ListingType {
  return {
    ...EmptyListing(),
    bodyType,
    typeId: id,
    make,
    makeKey,
    model,
    modelKey,
    typeFull: fullName,
    doors,
    seats,
    tsn,
    fuelType,
    consumptionCategory,
    euroStandard,
    consumptionCombined: consumptionCombined || undefined,
    consumptionExtraUrban: consumptionExtraUrban || undefined,
    consumptionUrban: consumptionUrban || undefined,
    systemPerformanceKiloWatts: systemPerformanceKiloWatts || undefined,
    transmissionType,
    horsePower: horsePower || undefined,
    driveType,
    cubicCapacity: cubicCapacity || undefined,
    cylinders: cylinders || undefined,
    gears: gears || undefined,
    weight: weight || undefined,
    payload: payload || undefined,
    towingCapacity: towingCapacity || undefined,
    productionEndDate: productionEndDate || undefined,
    productionStartDate: productionStartDate || undefined,
  }
}
