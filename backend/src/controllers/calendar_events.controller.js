import {
  getEventsByUserId,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/calendar_events.service.js'

export async function getCalendarEvents(req, res) {
  const userId = req.userId
  try {
    const events = await getEventsByUserId(userId)
    return res.status(200).json({ data: events })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '取得行事曆行程失敗' })
  }
}

export async function createCalendarEvent(req, res) {
  const { petId, title, eventDate, eventTime, type, location, notes } = req.body
  try {
    const event = await createEvent({ petId, title, eventDate, eventTime, type, location, notes })
    return res.status(201).json({ message: '行事曆行程新增成功', data: event })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '新增行事曆行程失敗' })
  }
}

export async function updateCalendarEvent(req, res) {
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

export async function deleteCalendarEvent(req, res) {
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
