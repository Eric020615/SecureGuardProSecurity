export enum RoleEnum {
    'SYSTEM_ADMIN' = 'SA',
    'STAFF' = 'STF',
    'RESIDENT' = 'RES',
    'RESIDENT_SUBUSER' = 'SUB'
}

export enum RoleConst {
    'RES' = 'Resident',
    "SA" = "System Admin",
    "STF" = "Staff",
    'SUB' = 'Sub-user'
}

export enum Gender {
    'MALE' = 'M',
    'FEMALE' = 'F'
}

export type RoleParam =
  | "SA"
  | "STF"
  | "RES"
  | "SUB";