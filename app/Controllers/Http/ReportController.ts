import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Report from 'App/Models/Report'

export default class ReportController {
    // Get all reports
    public async index({ response }: HttpContextContract) {
        const reports = await Report.all()
        return response.json(reports)
    }

    // Create a report
    public async store({ request, response }: HttpContextContract) {
        const reportData = request.only(['reporterId', 'reportedUserId', 'reason', 'dateReported'])
        const report = await Report.create(reportData)
        return response.status(201).json(report)
    }

    // Get a single report
    public async show({ params, response }: HttpContextContract) {
        const report = await Report.find(params.id)
        if (!report) {
            return response.status(404).json({ message: 'Report not found' })
        }
        return response.json(report)
    }

    // Update a report
    public async update({ params, request, response }: HttpContextContract) {
        const report = await Report.find(params.id)
        if (!report) {
            return response.status(404).json({ message: 'Report not found' })
        }
        report.merge(request.only(['reporterId', 'reportedUserId', 'reason', 'dateReported']))
        await report.save()
        return response.json(report)
    }

    // Delete a report
    public async destroy({ params, response }: HttpContextContract) {
        const report = await Report.find(params.id)
        if (!report) {
            return response.status(404).json({ message: 'Report not found' })
        }
        await report.delete()
        return response.json({ message: 'Report deleted' })
    }
}
