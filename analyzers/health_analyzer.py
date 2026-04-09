# Health Analyzer Module

def analyze_vitals(bpm=None, temperature_f=None):
    """
    Analyze vital signs for health status
    """
    status = 'normal'
    warnings = []
    
    if bpm and (bpm < 100 or bpm > 160):
        warnings.append(f'Heart rate {bpm} bpm is outside normal range (100-160)')
        status = 'warning'
    
    if temperature_f and (temperature_f < 97.5 or temperature_f > 99.5):
        warnings.append(f'Temperature {temperature_f}°F is outside normal range (97.5-99.5)')
        status = 'warning'
    
    return {
        'status': status,
        'bpm': bpm,
        'temperature_f': temperature_f,
        'warnings': warnings
    }

def analyze_sleep(total_hours=None, quality_grade=None):
    """
    Analyze sleep quality and duration
    """
    recommendations = []
    
    if total_hours and total_hours < 10:
        recommendations.append('Baby needs more sleep - aim for 10-14 hours daily')
    if quality_grade == 'Low':
        recommendations.append('Poor sleep quality detected - check environment and comfort')
    
    return {
        'total_hours': total_hours,
        'quality_grade': quality_grade,
        'recommendations': recommendations
    }

def calculate_bmi(weight_kg=None, height_cm=None):
    """
    Calculate BMI from weight and height
    """
    if not weight_kg or not height_cm:
        return None
    
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

def get_bmi_recommendations(bmi=None, age_months=None):
    """
    Get BMI recommendations based on age
    """
    if not bmi:
        return []
    
    recommendations = []
    
    if bmi < 14:
        recommendations.append('BMI is below average - ensure adequate nutrition')
    elif bmi > 18:
        recommendations.append('BMI is above average - monitor food intake')
    else:
        recommendations.append('BMI is within healthy range')
    
    return recommendations
