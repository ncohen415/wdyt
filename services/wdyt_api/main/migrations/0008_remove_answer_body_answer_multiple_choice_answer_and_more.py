# Generated by Django 4.2.10 on 2024-02-23 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_question_response_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='body',
        ),
        migrations.AddField(
            model_name='answer',
            name='multiple_choice_answer',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='answer',
            name='words_only_answer',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='answer',
            name='yes_no_answer',
            field=models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='allow_explanation',
            field=models.BooleanField(default=True, null=True),
        ),
        migrations.CreateModel(
            name='MultipleChoiceOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(blank=True, max_length=200, null=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.question')),
            ],
        ),
    ]