import ReporteCorreo from '../models/ReporteCorreo.js'

export const getReportes = async (req, res) => {
  const reportes = await ReporteCorreo.find({})
  res.status(200).json(reportes)
}

export const deleteReporte = async (req, res) => {
  try {
    await ReporteCorreo.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Reporte eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el reporte' })
  }
}
