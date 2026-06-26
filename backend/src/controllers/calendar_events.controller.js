import {
  getEventsByUserId,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/calendar_events.service.js'

export function createGetCalendarEvents({ getEventsByUserId }) {
  return async function getCalendarEvents(req, res) {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })
    try {
      const events = await getEventsByUserId(userId)
      return res.status(200).json({ data: events })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '取得行事曆行程失敗' })
    }
  }
}
export const getCalendarEvents = createGetCalendarEvents({ getEventsByUserId })

export function createCreateCalendarEvent({ createEvent }) {
  return async function createCalendarEvent(req, res) {
    const userId = req.userId
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })
    const { petId, title, eventDate, eventTime, type, location, notes } = req.body
    try {
      const event = await createEvent({ petId, userId, title, eventDate, eventTime, type, location, notes })
      if (!event) {
        return res.status(403).json({ message: '無此寵物的操作權限' })
      }
      return res.status(201).json({ message: '行事曆行程新增成功', data: event })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '新增行事曆行程失敗' })
    }
  }
}
export const createCalendarEvent = createCreateCalendarEvent({ createEvent })

export function createUpdateCalendarEvent({ updateEvent }) {
  return async function updateCalendarEvent(req, res) {
    const { id } = req.params
    const userId = req.userId
    const { title, eventDate, eventTime, type, location, notes, isCompleted } = req.body

    const fields = {
      ...(title !== undefined && { title }),
      ...(eventDate !== undefined && { event_date: eventDate }),
      ...(eventTime !== undefined && { event_time: eventTime }),
      ...(type !== undefined && { type }),
      ...(location !== undefined && { location }),
      ...(notes !== undefined && { notes }),
      ...(isCompleted !== undefined && { is_completed: isCompleted }),
    }

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: '請提供至少一個要更新的欄位' })
    }

    try {
      const event = await updateEvent(id, fields, userId)
      if (!event) {
        return res.status(404).json({ message: '找不到此行事曆行程' })
      }
      return res.status(200).json({ message: '行事曆行程更新成功', data: event })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '更新行事曆行程失敗' })
    }
  }
}
export const updateCalendarEvent = createUpdateCalendarEvent({ updateEvent })

export function createDeleteCalendarEvent({ deleteEvent }) {
  return async function deleteCalendarEvent(req, res) {
    const { id } = req.params
    const userId = req.userId
    try {
      const deleted = await deleteEvent(id, userId)
      if (!deleted) {
        return res.status(404).json({ message: '找不到此行事曆行程' })
      }
      return res.status(204).send()
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: '刪除行事曆行程失敗' })
    }
  }
}
export const deleteCalendarEvent = createDeleteCalendarEvent({ deleteEvent })
