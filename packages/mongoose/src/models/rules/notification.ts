import { model, Schema } from 'mongoose'

import {
  EtherRetrieveNotificationExtensionDocument,
  NotificationBaseDocument,
  NotificationType
} from '../../types/notification'

const notificationBaseSchema = new Schema<NotificationBaseDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { discriminatorKey: 'type' })

const notifications = model('NotificationBase', notificationBaseSchema, 'notifications')

// ETHER RETRIEVE

const etherRetrieveNotificationExtensionSchema = new Schema<EtherRetrieveNotificationExtensionDocument>({
  amount: {
    type: String,
    required: true,
  },
})

export const etherRetrieveNotification = notifications.discriminator(
  NotificationType.ETHER_RETRIEVE,
  etherRetrieveNotificationExtensionSchema
)

export default { notifications, etherRetrieveNotification }
