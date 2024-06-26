import { type z } from 'zod'
import { type SettingsValidationSchema } from '../../settings'
import { type AppointmentSchemaType } from '../schema/appointment'
import { type PatientSchemaType } from '../schema/patient'

export const mockSettings: z.infer<typeof SettingsValidationSchema> = {
  client_id: 'client_id',
  client_secret: 'client_secret',
  auth_url: 'https://api.preview.platform.athenahealth.com/oauth2/v1/token',
  api_url: 'https://api.preview.platform.athenahealth.com',
  scope:
    'athena/service/Athenanet.MDP.* system/Observation.read system/Patient.read',
  practiceId: '1959684',
}

export const mockGetPatientResponse: PatientSchemaType & Record<string, any> = {
  email: 'nick@awellhealth.com',
  guarantorcountrycode3166: 'US',
  departmentid: '1',
  portaltermsonfile: false,
  consenttotext: false,
  dob: '11/30/1993',
  patientphoto: false,
  guarantorfirstname: 'Nick',
  lastname: 'Hellemans',
  guarantorlastname: 'Hellemans',
  contactpreference_announcement_sms: false,
  guarantordob: '11/30/1993',
  guarantorrelationshiptopatient: '1',
  firstname: 'Nick',
  confidentialitycode: 'N',
  emailexists: true,
  contactpreference_lab_phone: true,
  balances: [
    {
      departmentlist: '1,21,102,144,145,148,150,157,162,166,168',
      balance: 0,
      cleanbalance: true,
      providergroupid: 1,
    },
  ],
  guarantoremail: 'nick@awellhealth.com',
  patientid: '56529',
  contactpreference_billing_phone: true,
  lastupdated: '02/16/2024',
  contactpreference_billing_sms: false,
  driverslicense: false,
  primarydepartmentid: '1',
  contactpreference_announcement_email: true,
  contactpreference_announcement_phone: true,
  guarantoraddresssameaspatient: true,
  contactpreference_appointment_phone: true,
  contactpreference_billing_email: true,
  countrycode: 'USA',
  registrationdate: '02/15/2024',
  contactpreference_appointment_sms: false,
  lastupdatedby: 'API-30490',
  guarantorcountrycode: 'USA',
  portalaccessgiven: false,
  contactpreference_lab_sms: false,
  status: 'active',
  contactpreference_appointment_email: true,
  contactpreference_lab_email: true,
  privacyinformationverified: false,
  countrycode3166: 'US',
}

export const mockGetAppointmentResponse: AppointmentSchemaType &
  Record<string, any> = {
  appointmenttype: 'PHYSICAL EXAM',
  patientid: '1',
  copay: 0,
  appointmentstatus: '4',
  departmentid: '1',
  providerid: '21',
  patientlocationid: '64',
  patientappointmenttypename: 'Physical Exam Visit',
  stopcheckin: '03/29/2021 16:39:42',
  date: '02/27/2009',
  renderingproviderid: '21',
  encounterstate: 'OPEN',
  startcheckin: '03/29/2021 16:37:42',
  appointmentcopay: {
    collectedforappointment: 0,
    insurancecopay: 0,
    collectedforother: 0,
  },
  appointmentid: '1',
  appointmenttypeid: '4',
  chargeentrynotrequired: false,
  duration: 30,
  starttime: '08:00',
  encounterstatus: 'CHECKEDOUT',
  encounterid: '40941',
}
