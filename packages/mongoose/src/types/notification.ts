import { Document, Types } from 'mongoose'

export enum NotificationType {
  ETHER_RETRIEVE = 'ether-retrieve',
}

export interface NotificationBase {
  userId: Types.ObjectId
  createdAt: Date
  read: boolean
  type: string
}

export interface NotificationBaseDocument extends NotificationBase, Document {}

// ETHER RETRIEVE

export interface EtherRetrieveNotificaionExtension {
  amount: string
}

export interface EtherRetrieveNotificaion extends NotificationBase, EtherRetrieveNotificaionExtension {}

export interface EtherRetrieveNotificationExtensionDocument extends EtherRetrieveNotificaionExtension, Document {}

// GLOBAL INTERFACE

export type Notification = EtherRetrieveNotificaion
