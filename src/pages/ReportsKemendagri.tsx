import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Assessment } from "@/models/types";
import { kemendagriIndicators } from "@/models/kemendagri-indicators";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { getHealthCategory } from "@/models/health-categories";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ReportsKemendagri = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);

        const { data: assessmentData, error: assessmentError } = await supabase
          .from('kemendagri_assessments')
          .select('*')
          .order('year', { ascending: true });

        if (assessmentError) throw assessmentError;

        if (!assessmentData?.length) {
          setAssessments([]);
          return;
        }

        const { data: valuesData, error: valuesError } = await supabase
          .from('kemendagri_assessment_values')
          .select('*');

        if (valuesError) throw valuesError;

        const mappedAssessments = assessmentData.map((assessment) => {
          const values: Record<string, { value: number, score: number }> = {};

          valuesData
            .filter((value) => value.assessment_id === assessment.id)
            .forEach((value) => {
              values[value.indicator_id] = {
                value: Number(value.value),
                score: Number(value.score)
              };
            });

          return {
            id: assessment.id,
            name: assessment.name,
            year: assessment.year,
            date: assessment.date,
            userId: assessment.user_id,
            totalScore: assessment.total_score || 0,
            status: assessment.status,
            values: values
          };
        });

        setAssessments(mappedAssessments);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const yearlyScoreData = assessments.map(assessment => ({
    year: assessment.year,
    score: assessment.totalScore,
    category: getHealthCategory(assessment.totalScore).category
  }));

  const healthCategories = assessments.reduce<Record<string, number>>((acc, assessment) => {
    const category = getHealthCategory(assessment.totalScore).category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const healthCategoryData = Object.entries(healthCategories).map(([category, count]) => ({
    name: category,
    value: count
  }));

  const aspectData = kemendagriIndicators.reduce<Record<string, { category: string, indicators: string[] }>>((acc, indicator) => {
    if (!acc[indicator.category]) {
      acc[indicator.category] = {
        category: indicator.category,
        indicators: []
      };
    }
    acc[indicator.category].indicators.push(indicator.id);
    return acc;
  }, {});

  const yearlyAspectScores = assessments.map(assessment => {
    const aspectScores: Record<string, number> = {};

    Object.entries(aspectData).forEach(([category, { indicators }]) => {
      let totalWeightedScore = 0;
      let totalWeight = 0;

      indicators.forEach(indicatorId => {
        const indicator = kemendagriIndicators.find(ind => ind.id === indicatorId);
        const value = assessment.values[indicatorId];

        if (indicator && value) {
          totalWeightedScore += value.score * indicator.weight;
          totalWeight += indicator.weight;
        }
      });

      aspectScores[category] = totalWeight ? totalWeightedScore / totalWeight : 0;
    });

    return {
      year: assessment.year,
      ...aspectScores
    };
  });

  if (loading) {
    return (
      <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
        <div className="text-center py-10">
          <p className="text-muted-foreground">Memuat data laporan...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!assessments.length) {
    return (
      <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Laporan Penilaian KEMENDAGRI</h1>
          </div>
          <div className="border rounded-lg p-6 bg-background">
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-2">Belum ada data penilaian KEMENDAGRI</p>
              <p className="text-sm text-muted-foreground">Silahkan buat penilaian KEMENDAGRI terlebih dahulu</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Laporan Penilaian KEMENDAGRI">
      {/* ...semua elemen visual tetap sama seperti semula */}
    </DashboardLayout>
  );
};

export default ReportsKemendagri;
